package org.zerock.project_academy.security.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Map;

@Component
@Log4j2
public class JWTUtil {

    @Value("${org.zerock.jwt.secret}")
    private String jwtSecret;
    public static final String ROLE_PREFIX = "ROLE_";

    private Key getSigningKey() {
        // jwtSecret를 Base64로 인코딩하고 SecretKeySpec을 사용하여 키를 생성합니다.
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS512.getJcaName());
    }

    public String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        Claims claims = validateToken(token);
        String username = claims.getSubject();
        return username.equals(userDetails.getUsername());
    }

    public static SimpleGrantedAuthority convertToAuthority(String role){
        String formatRole=role.startsWith(ROLE_PREFIX)? role: ROLE_PREFIX + role;
        return new SimpleGrantedAuthority(formatRole);
    }
}
