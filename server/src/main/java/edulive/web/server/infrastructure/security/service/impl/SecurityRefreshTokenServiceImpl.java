package edulive.web.server.infrastructure.security.service.impl;

import edulive.web.server.core.common.base.ResponseObject;
import edulive.web.server.entities.main.RefreshToken;
import edulive.web.server.entities.main.User;
import edulive.web.server.infrastructure.constants.module.Role;
import edulive.web.server.infrastructure.security.model.request.AuthLoginRequest;
import edulive.web.server.infrastructure.security.model.request.AuthRefreshRequest;
import edulive.web.server.infrastructure.security.model.request.AuthRegisterRequest;
import edulive.web.server.infrastructure.security.model.response.AuthRefreshResponse;
import edulive.web.server.infrastructure.security.model.response.TokenUriResponse;
import edulive.web.server.infrastructure.security.repository.SecurityRefreshRepository;
import edulive.web.server.infrastructure.security.repository.SecurityUserRepository;
import edulive.web.server.infrastructure.security.service.RefreshTokenService;
import edulive.web.server.infrastructure.security.service.SecurityRefreshTokenService;
import edulive.web.server.infrastructure.security.service.TokenProvider;
import edulive.web.server.utils.Helper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Validated
@Slf4j
public class SecurityRefreshTokenServiceImpl implements SecurityRefreshTokenService {

    private final TokenProvider tokenProvider;

    private final SecurityRefreshRepository authRefreshTokenRepository;

    private final SecurityUserRepository authUserRepository;

    private final RefreshTokenService refreshTokenService;

    @Override
    public ResponseObject<?> getRefreshToken(@Valid AuthRefreshRequest request) {
        try {
            String refreshToken = request.getRefreshToken();

            Optional<RefreshToken> refreshTokenOptional = authRefreshTokenRepository.findByRefreshToken(refreshToken);
            if (refreshTokenOptional.isEmpty()) {
                return ResponseObject.errorForward(HttpStatus.NOT_FOUND, "Refresh token not found");
            }

            RefreshToken refreshTokenEntity = refreshTokenOptional.get();
            if (refreshTokenEntity.getRevokedAt() != null) {
                return ResponseObject.errorForward(HttpStatus.BAD_REQUEST, "Refresh token has been revoked");
            }

            String accessToken = tokenProvider.createToken(refreshTokenEntity.getUserId());
            return ResponseObject.successForward(new AuthRefreshResponse(accessToken, refreshToken), "Get refresh token successfully");
        } catch (Exception e) {
            return ResponseObject.errorForward(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    @Override
    public ResponseObject<?> logout(@Valid AuthRefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        Optional<RefreshToken> refreshTokenOptional = authRefreshTokenRepository.findByRefreshToken(refreshToken);
        if (refreshTokenOptional.isEmpty()) {
            return ResponseObject.errorForward(HttpStatus.NOT_FOUND, "Refresh token not found");
        }

        RefreshToken refreshTokenEntity = refreshTokenOptional.get();
        refreshTokenEntity.setRevokedAt(System.currentTimeMillis());
        authRefreshTokenRepository.save(refreshTokenEntity);

        return ResponseObject.successForward(null, "Logout successfully");
    }

    @Override
    public ResponseObject<?> login(AuthLoginRequest request) {
        try {
            Optional<User> userOptional = authUserRepository.getUserByEmailOrPhoneNumber(request.getEmail(), request.getEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (user.getPassword().equals(request.getPassword())) {
                    String accessToken = tokenProvider.createToken(user.getId());
                    String refreshToken = refreshTokenService.createRefreshToken(user.getId()).getRefreshToken();
                    return ResponseObject.successForward(TokenUriResponse.getState(accessToken, refreshToken), "Get state successfully");
                } else {
                    return ResponseObject.errorForward(HttpStatus.BAD_REQUEST, "Mật khẩu hoặc tài khoản sai");
                }
            }
            return ResponseObject.errorForward(HttpStatus.BAD_REQUEST, "Tài khoản không tồn tại trong hệ thống");
        } catch (Exception e) {
            e.printStackTrace(System.out);
            return ResponseObject.errorForward(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public ResponseObject<?> register(AuthRegisterRequest request) {
        try {
            Optional<User> userOptional = authUserRepository.findByEmail(request.getEmail());
            if (userOptional.isPresent()) {
                return ResponseObject.errorForward(HttpStatus.BAD_REQUEST, "Email already in use");
            }
            User user = new User();

            user.setFullName(request.getFullName());
            user.setPhoneNumber(request.getPhoneNumber());
            String formattedCode = Helper.getSubCodeFromName(request.getFullName());
            Long count = authUserRepository.count() + 1;
            user.setCode(formattedCode + count);
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setRole(Role.STUDENT);
            user.setDeleted(false);
            String userId = authUserRepository.save(user).getId();
            String accessToken = tokenProvider.createToken(userId);
            String refreshToken = refreshTokenService.createRefreshToken(userId).getRefreshToken();
            return ResponseObject.successForward(TokenUriResponse.getState(accessToken, refreshToken), "Get state successfully");
        } catch (Exception e) {
            e.printStackTrace(System.out);
            log.info("😢😢 ~> Error encrypt register");
            return ResponseObject.errorForward(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
