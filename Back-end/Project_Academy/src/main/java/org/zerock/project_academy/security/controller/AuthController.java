package org.zerock.project_academy.security.controller;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.security.dto.MemberSecurityDTO;
import org.zerock.project_academy.security.util.JWTUtil;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j2
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String mno = loginRequest.get("username");
        String password = loginRequest.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(mno, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken(Map.of("mno", mno));

        // 사용자 정보를 가져와서 mno와 m_name을 응답에 포함
        MemberSecurityDTO userDetails = (MemberSecurityDTO) authentication.getPrincipal();
        String mName = userDetails.getM_name();

        return ResponseEntity.ok().body(Map.of("accessToken", jwt, "mno", mno, "m_name", mName));
    }


    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> tokenRequest) {
        String refreshToken = tokenRequest.get("refreshToken");

        try {
            Claims claims = jwtUtil.validateToken(refreshToken);
            String mno = (String) claims.get("mno");

            String newAccessToken = jwtUtil.generateToken(Map.of("mno", mno));

            return ResponseEntity.ok().body(Map.of("accessToken", newAccessToken));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid refresh token");
        }
    }
}
