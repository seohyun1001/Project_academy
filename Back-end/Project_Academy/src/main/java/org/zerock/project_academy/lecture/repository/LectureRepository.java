package org.zerock.project_academy.lecture.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.lecture.domain.Lecture;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, String> {

    List<Lecture> findByMemberL_Mno(String mno);
}
