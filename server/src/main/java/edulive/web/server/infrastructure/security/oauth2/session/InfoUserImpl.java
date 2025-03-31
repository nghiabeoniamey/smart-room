package edulive.web.server.infrastructure.security.oauth2.session;

import edulive.web.server.infrastructure.constants.auth.Session;
import edulive.web.server.infrastructure.security.model.response.InfoUserTShirtTwoResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class InfoUserImpl implements InfoUser {

    private final HttpSession httpSession;

    public InfoUserImpl(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    @Override
    public String getId() {
        log.info("Session.CURRENT_USER_ID + {}",
                httpSession.getAttribute(Session.CURRENT_USER_ID) == null ?
                        "system" : httpSession.getAttribute(Session.CURRENT_USER_ID).toString());
        return httpSession.getAttribute(Session.CURRENT_USER_ID).toString() == null ?
                "system" : httpSession.getAttribute(Session.CURRENT_USER_ID).toString();
    }

    @Override
    public String getUserName() {
        log.info("Session.CURRENT_USER_NAME + {}",
                httpSession.getAttribute(Session.CURRENT_USER_NAME) == null ?
                        "System" : httpSession.getAttribute(Session.CURRENT_USER_NAME).toString());
        return httpSession.getAttribute(Session.CURRENT_USER_NAME) == null ?
                "System" : httpSession.getAttribute(Session.CURRENT_USER_NAME).toString();
    }

    @Override
    public String getEmail() {
        log.info("Session.CURRENT_USER_EMAIL + {}",
                httpSession.getAttribute(Session.CURRENT_USER_EMAIL) == null ?
                        "System" : httpSession.getAttribute(Session.CURRENT_USER_EMAIL).toString());
        return httpSession.getAttribute(Session.CURRENT_USER_EMAIL).toString();
    }

    @Override
    public String getProfilePicture() {
        log.info("Session.CURRENT_USER_PROFILE_PICTURE + {}",
                httpSession.getAttribute(Session.CURRENT_USER_PROFILE_PICTURE) == null ?
                        "System" : httpSession.getAttribute(Session.CURRENT_USER_PROFILE_PICTURE).toString());
        return httpSession.getAttribute(Session.CURRENT_USER_PROFILE_PICTURE) == null ?
                "System" : httpSession.getAttribute(Session.CURRENT_USER_PROFILE_PICTURE).toString();
    }

    @Override
    public String getRoleCode() {
        log.info("Session.CURRENT_USER_ROLE_CODE + {}",
                httpSession.getAttribute(Session.CURRENT_USER_ROLE_CODE) == null ?
                        "System" : httpSession.getAttribute(Session.CURRENT_USER_ROLE_CODE).toString());
        return httpSession.getAttribute(Session.CURRENT_USER_ROLE_CODE).toString();
    }

    @Override
    public String getRoleName() {
        log.info("Session.CURRENT_USER_ROLE_NAME + {}",
                httpSession.getAttribute(Session.CURRENT_USER_ROLE_NAME) == null ?
                        "System" : httpSession.getAttribute(Session.CURRENT_USER_ROLE_NAME).toString());
        return httpSession.getAttribute(Session.CURRENT_USER_ROLE_NAME).toString();
    }

    @Override
    public String getHost() {
        return httpSession.getAttribute(Session.CURRENT_HOST) == null ?
                "System" : httpSession.getAttribute(Session.CURRENT_HOST).toString();
    }

    @Override
    public InfoUserTShirtTwoResponse getInfoUserSpotify() {
        return new InfoUserTShirtTwoResponse(
                getId(),
                getUserName(),
                getEmail(),
                getProfilePicture(),
                getRoleCode(),
                getRoleName(),
                getHost()
        );
    }
}
