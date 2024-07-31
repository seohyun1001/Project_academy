package org.zerock.project_academy.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.zerock.project_academy.security.filter.JWTFilter;
import org.zerock.project_academy.security.handler.Custom403Handler;
import org.zerock.project_academy.security.util.JWTUtil;
import org.zerock.project_academy.security.CustomUserDetailService;

import javax.sql.DataSource;

@Log4j2
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class CustomSecurityConfig {

    private final JWTUtil jwtUtil;
    private final DataSource dataSource;
    private final CustomUserDetailService customUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("-------------------- configure --------------------");

        JWTFilter jwtFilter = new JWTFilter(customUserDetailsService, jwtUtil);

        http.csrf().disable()
                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
//                .requestMatchers(HttpMethod.POST,"/auth/**").permitAll()
                .requestMatchers(HttpMethod.POST,"/member/login").permitAll()
//                .requestMatchers(HttpMethod.POST,"/error").permitAll()
//                .requestMatchers(HttpMethod.GET, "/student/**").permitAll() // 추가
//                .requestMatchers(HttpMethod.POST, "/student/**").permitAll() // 추가
//                .anyRequest().authenticated()
//                .anyRequest().permitAll() // 모든 요청에 대해 보안 무효화
                .and()
                .exceptionHandling().accessDeniedHandler(accessDeniedHandler())
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

//        // 자동 로그인 - 쿠키 생성
//        http.rememberMe()
//                .key("12345678")
//                .tokenRepository(persistentTokenRepository())
//                .userDetailsService(customUserDetailsService)
//                .tokenValiditySeconds(60*60*24*30);
//
//        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler());

        return http.build();
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new Custom403Handler();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
        tokenRepository.setDataSource(dataSource);
        return tokenRepository;
    }
}
