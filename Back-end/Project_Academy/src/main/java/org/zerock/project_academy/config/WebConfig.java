package org.zerock.project_academy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // 원래 파일 경로
        registry.addResourceHandler("/file/**")
                .addResourceLocations("file:///C:/upload/");

        // 강사 프로필 사진 경로
        registry.addResourceHandler("/profile_pictures/**")
                .addResourceLocations("file:///C:/upload/profile_pictures/");

        // 학생 프로필 사진 경로 추가
        registry.addResourceHandler("/student/images/**")
                .addResourceLocations("file:///C:/upload/studentProfile/");
    }
}