package org.zerock.project_academy.lecture.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.lecture.domain.LectureList;

public interface LectureListRepository extends JpaRepository<LectureList, Long> {
}
