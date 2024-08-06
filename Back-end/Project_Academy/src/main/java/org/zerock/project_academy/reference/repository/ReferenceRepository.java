package org.zerock.project_academy.reference.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.reference.domain.Reference;

import java.util.List;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
    // 최신 공지사항 5개를 가져오는 메서드
    List<Reference> findTop5ByOrderByRegDateDesc();
}
