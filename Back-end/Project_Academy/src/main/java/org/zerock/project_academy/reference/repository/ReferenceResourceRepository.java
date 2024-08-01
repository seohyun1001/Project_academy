package org.zerock.project_academy.reference.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.reference.domain.ReferenceResource;

public interface ReferenceResourceRepository extends JpaRepository<ReferenceResource, Long> {
}
