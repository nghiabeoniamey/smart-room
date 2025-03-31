package edulive.web.server.infrastructure.security.service;

import edulive.web.server.entities.main.User;
import edulive.web.server.infrastructure.security.oauth2.session.InfoUser;
import edulive.web.server.infrastructure.security.oauth2.user.UserPrincipal;
import edulive.web.server.infrastructure.security.repository.SecurityUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final InfoUser infoUser;

    private final SecurityUserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String role = user.getRole().name();
            return UserPrincipal.create(user, role);
        }
        throw new UsernameNotFoundException("user staff not found with email : " + email);
    }

}