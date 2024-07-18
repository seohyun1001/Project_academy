package org.zerock.project_academy.security.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import org.zerock.project_academy.security.CustomUserDetailService;
import org.zerock.project_academy.security.exception.AccessTokenException;
import org.zerock.project_academy.security.util.JWTUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final CustomUserDetailService customUserDetailsService;
    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        // 회원가입 경로는 필터를 거치지 않도록 예외 처리
        if ("/members/register".equals(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        String headerStr = request.getHeader("Authorization");

        if (headerStr == null || !headerStr.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String tokenStr = headerStr.substring(7);

        try {
            Map<String, Object> claims = jwtUtil.validateToken(tokenStr);
            String username = (String) claims.get("username");

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (ExpiredJwtException e) {
            log.error("ExpiredJwtException");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
            return;
        } catch (SignatureException e) {
            log.error("SignatureException");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token signature");
            return;
        } catch (MalformedJwtException e) {
            log.error("MalformedJwtException");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Malformed token");
            return;
        } catch (AccessTokenException e) {
            log.error("AccessTokenException");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid access token");
            return;
        }

        filterChain.doFilter(request, response);
    }
}

