package org.zerock.project_academy.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.zerock.project_academy.security.handler.Custom403Handler;


@Log4j2
@Configuration
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class CustomSecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("-------------------- configure --------------------");

        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler());

        return http.build();
    }


    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new Custom403Handler();
    }




}
