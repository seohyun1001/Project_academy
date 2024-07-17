package org.zerock.project_academy.security.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.security.util.JWTUtil;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@Log4j2
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String mno = loginRequest.get("mno");
        String password = loginRequest.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(mno, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken(Map.of("mid", mno), 1);
        String refreshJwt = jwtUtil.generateToken(Map.of("mid", mno), 30);

        return ResponseEntity.ok().body(Map.of("accessToken", jwt, "refreshToken", refreshJwt));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> tokenRequest) {
        String refreshToken = tokenRequest.get("refreshToken");

        try {
            Map<String, Object> claims = jwtUtil.validateToken(refreshToken);
            String mid = (String) claims.get("mid");

            String newAccessToken = jwtUtil.generateToken(Map.of("mid", mid), 1);
            String newRefreshToken = jwtUtil.generateToken(Map.of("mid", mid), 30);

            return ResponseEntity.ok().body(Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid refresh token");
        }
    }
}
