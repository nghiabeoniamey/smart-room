package edulive.web.server.infrastructure.security.oauth2.session;

import edulive.web.server.infrastructure.security.model.response.InfoUserTShirtTwoResponse;

public interface InfoUser {

    String getId();

    String getUserName();

    String getEmail();

    String getProfilePicture();

    String getRoleCode();

    String getRoleName();

    String getHost();

    InfoUserTShirtTwoResponse getInfoUserSpotify();

}
