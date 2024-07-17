package org.zerock.project_academy.security.util;

import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.zerock.project_academy.security.exception.AccessTokenException;

import java.util.Date;
import java.util.Map;

@Log4j2
@Component
public class JWTUtil {

    @Value("${org.zerock.jwt.secret}")
    private String key;

    public String generateToken(Map<String, Object> claims, int days) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000L);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public Map<String, Object> validateToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.EXPIRED);
        } catch (MalformedJwtException e) {
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.MALFORM);
        } catch (SignatureException e) {
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.BADSIGN);
        }
    }
}
