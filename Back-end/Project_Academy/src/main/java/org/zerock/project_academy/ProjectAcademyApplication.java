package org.zerock.project_academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ProjectAcademyApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectAcademyApplication.class, args);
	}

}
