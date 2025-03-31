package edulive.web.server.infrastructure.security.oauth2;

import edulive.web.server.entities.main.User;
import edulive.web.server.infrastructure.constants.module.Role;
import edulive.web.server.infrastructure.security.exception.OAuth2AuthenticationProcessingException;
import edulive.web.server.infrastructure.security.oauth2.user.OAuth2UserInfo;
import edulive.web.server.infrastructure.security.oauth2.user.OAuth2UserInfoFactory;
import edulive.web.server.infrastructure.security.oauth2.user.UserPrincipal;
import edulive.web.server.infrastructure.security.repository.SecurityUserRepository;
import edulive.web.server.utils.AESPasswordCryptoUtil;
import edulive.web.server.utils.Helper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final SecurityUserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory
                .getOAuth2UserInfo(
                        oAuth2UserRequest.getClientRegistration().getRegistrationId(),
                        oAuth2User.getAttributes()
                );
        if (oAuth2UserInfo.getEmail() == null || oAuth2UserInfo.getEmail().isBlank()) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getDeleted().equals(true)) {
                throw new OAuth2AuthenticationProcessingException("The specified user is disabled");
            }
            User userExists = (User) updateExistingUser(user, oAuth2UserInfo);
            return UserPrincipal.create(userExists, oAuth2User.getAttributes(), userExists.getRole().name());
        }

        Object newUser = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        if (newUser instanceof User originClient) {
            return UserPrincipal.create(originClient, oAuth2User.getAttributes(), Role.STUDENT.name());
        } else {
            throw new OAuth2AuthenticationProcessingException("Invalid Client Format");
        }
    }


    private Object registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();
        user.setFullName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setProfilePicture(oAuth2UserInfo.getImageUrl());
        user.setDeleted(false);
        user.setPassword(null);
        String pass = AESPasswordCryptoUtil.genPassword(8L);
        user.setPassword(pass);
        String formattedCode = Helper.getSubCodeFromName(oAuth2UserInfo.getName());
        Long count = userRepository.count() + 1;
        user.setCode(formattedCode + count);
        user.setRole(Role.STUDENT);
        user.setDeleted(false);
        return userRepository.save(user);
    }

    private Object updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setFullName(oAuth2UserInfo.getName());
        existingUser.setProfilePicture(oAuth2UserInfo.getImageUrl());
        if (existingUser.getDeleted() == null) existingUser.setDeleted(true);
        return userRepository.save(existingUser);
    }

}
