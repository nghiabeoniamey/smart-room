package edulive.web.server.utils;

import edulive.web.server.infrastructure.security.oauth2.user.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditorProviderByAuthenticationUtil {

    public static final String SYSTEM = "SYSTEM";

    public static String getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return "SYSTEM";
    }

}
