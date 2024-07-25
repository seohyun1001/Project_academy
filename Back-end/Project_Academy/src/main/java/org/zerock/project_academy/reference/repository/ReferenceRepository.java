package org.zerock.project_academy.reference.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.reference.domain.Reference;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
}
