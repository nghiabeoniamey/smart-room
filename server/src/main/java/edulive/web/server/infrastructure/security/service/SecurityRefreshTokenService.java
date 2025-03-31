package edulive.web.server.infrastructure.security.service;

import edulive.web.server.core.common.base.ResponseObject;
import edulive.web.server.infrastructure.security.model.request.AuthLoginRequest;
import edulive.web.server.infrastructure.security.model.request.AuthRefreshRequest;
import edulive.web.server.infrastructure.security.model.request.AuthRegisterRequest;
import jakarta.validation.Valid;

public interface SecurityRefreshTokenService {

    ResponseObject<?> getRefreshToken(@Valid AuthRefreshRequest request);

    ResponseObject<?> logout(@Valid AuthRefreshRequest request);

    ResponseObject<?> login(@Valid AuthLoginRequest request);

    ResponseObject<?> register(@Valid AuthRegisterRequest request);

}
