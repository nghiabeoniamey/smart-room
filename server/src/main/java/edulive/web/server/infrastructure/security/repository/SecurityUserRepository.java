package edulive.web.server.infrastructure.security.repository;

import edulive.web.server.entities.main.User;
import edulive.web.server.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecurityUserRepository extends UserRepository {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<User> getUserByEmailOrPhoneNumber(String email, String phoneNumber);

    boolean existsUserById(String id);

}
