package edulive.web.server.infrastructure.security.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edulive.web.server.entities.main.User;
import edulive.web.server.infrastructure.constants.auth.Session;
import edulive.web.server.infrastructure.constants.module.Role;
import edulive.web.server.infrastructure.security.model.response.InfoUserTShirtTwoResponse;
import edulive.web.server.infrastructure.security.oauth2.user.UserPrincipal;
import edulive.web.server.infrastructure.security.repository.SecurityUserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpSession;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class TokenProvider {

    @Value("${jwt.secret}")
    private String tokenSecret;

    private final long TOKEN_EXP = 10 * 60 * 60 * 1000;

    @Setter(onMethod_ = @Autowired)
    private SecurityUserRepository userRepository;

    @Setter(onMethod_ = @Autowired)
    private HttpSession httpSession;

    public String createToken(Authentication authentication) throws BadRequestException, JsonProcessingException {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if (userRepository.existsUserById(userPrincipal.getId())) {
            User user = getCurrentUserStaffLogin(userPrincipal.getEmail());

            if (user == null) throw new BadRequestException("user not found");

            InfoUserTShirtTwoResponse infoUserTShirtTwoResponse = getInfoUserSpotifyResponse(user);
            String subject = new ObjectMapper().writeValueAsString(infoUserTShirtTwoResponse);
            Map<String, Object> claims = getBodyClaims(infoUserTShirtTwoResponse);

            return Jwts.builder()
                    .setSubject(subject)
                    .setClaims(claims)
                    .setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                    .setExpiration(new java.util.Date(System.currentTimeMillis() + TOKEN_EXP))
                    .setIssuer("Edulive")
                    .signWith(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                    .compact();
        } else {
            throw new BadRequestException("user client not found");
        }
    }

    public String createToken(String userId) throws BadRequestException, JsonProcessingException {
        if (userRepository.existsUserById(userId)) {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) throw new BadRequestException("user not found");

            InfoUserTShirtTwoResponse response = getInfoUserSpotifyResponse(user);
            String subject = new ObjectMapper().writeValueAsString(response);
            Map<String, Object> claims = getBodyClaims(response);

            return Jwts.builder()
                    .setSubject(subject)
                    .setClaims(claims)
                    .setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                    .setExpiration(new java.util.Date(System.currentTimeMillis() + TOKEN_EXP))
                    .setIssuer("Edulive")
                    .signWith(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                    .compact();
        } else {
            throw new BadRequestException("user client not found");
        }
    }

    private InfoUserTShirtTwoResponse getInfoUserSpotifyResponse(User user) {
        InfoUserTShirtTwoResponse response = new InfoUserTShirtTwoResponse();
        response.setId(user.getId());
        response.setUserName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setProfilePicture(user.getProfilePicture());
        response.setRoleCode(user.getRole().name());
        response.setRoleName(user.getRole().name());
        return response;
    }

    private static Map<String, Object> getBodyClaims(InfoUserTShirtTwoResponse response) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(Session.CURRENT_USER_ID, response.getId());
        claims.put(Session.CURRENT_USER_NAME, response.getUserName());
        claims.put(Session.CURRENT_USER_EMAIL, response.getEmail());
        claims.put(Session.CURRENT_USER_PROFILE_PICTURE, response.getProfilePicture());
        claims.put(Session.CURRENT_USER_ROLE_CODE, response.getRoleCode());
        claims.put(Session.CURRENT_USER_ROLE_NAME, response.getRoleName());
        claims.put(Session.CURRENT_HOST, response.getHost());
        return claims;
    }

    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return String.valueOf(claims.get("userId").toString());
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        String email = claims.get("email", String.class);
        if (email != null && !email.isEmpty()) {
            return email;
        }
        return claims.get("email", String.class);
    }

    public String getRoleFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        String roleCode = claims.get("roleCode", String.class);
        if (roleCode != null && !roleCode.isEmpty()) {
            return roleCode;
        }
        return claims.get("email", String.class);
    }

    public boolean isStaff(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        String roleCode = claims.get("roleCode", String.class);
        if (roleCode != null && !roleCode.isEmpty()) {
            return roleCode.equalsIgnoreCase(Role.ADMIN.name()) || roleCode.equalsIgnoreCase(Role.TEACHER.name());
        }
        return false;
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }

    private User getCurrentUserStaffLogin(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    public void setAttributeSession(String authToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
                .build()
                .parseClaimsJws(authToken)
                .getBody();
        String id = claims.get("id", String.class);
        String userName = claims.get("userName", String.class);
        String email = claims.get("email", String.class);
        String profilePicture = claims.get("profilePicture", String.class);
        String roleCode = claims.get("roleCode", String.class);
        String roleName = claims.get("roleName", String.class);
        httpSession.setAttribute(Session.CURRENT_USER_ID, id);
        httpSession.setAttribute(Session.CURRENT_USER_NAME, userName);
        httpSession.setAttribute(Session.CURRENT_USER_EMAIL, email);
        httpSession.setAttribute(Session.CURRENT_USER_PROFILE_PICTURE, profilePicture);
        httpSession.setAttribute(Session.CURRENT_USER_ROLE_CODE, roleCode);
        httpSession.setAttribute(Session.CURRENT_USER_ROLE_NAME, roleName);
    }

}
