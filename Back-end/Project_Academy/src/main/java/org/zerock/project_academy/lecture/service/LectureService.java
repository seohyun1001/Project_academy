package org.zerock.project_academy.lecture.service;

import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.dto.LectureDTO;
import org.zerock.project_academy.lecture.dto.PageRequestDTO;
import org.zerock.project_academy.lecture.dto.PageResponseDTO;

import java.util.List;
import java.util.Optional;

public interface LectureService {

    // insert
    Lecture registerLecture(Lecture lecture);

    // select
    List<Lecture> findAllLectures();

    // select one
    Optional<Lecture> findOneLectureById(String lno);

//    LectureDTO readOne(String lno);

    // search list
    PageResponseDTO<LectureDTO> searchLecture(PageRequestDTO pageRequestDTO);

    // update
    Lecture modifyLecture(LectureDTO lectureDTO);

    // delete
    void deleteLecture(String lno);

}
