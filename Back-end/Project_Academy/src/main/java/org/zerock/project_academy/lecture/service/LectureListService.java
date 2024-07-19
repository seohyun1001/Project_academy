package org.zerock.project_academy.lecture.service;

import org.zerock.project_academy.lecture.domain.LectureList;
import org.zerock.project_academy.lecture.dto.LectureDTO;
import org.zerock.project_academy.lecture.dto.LectureListDTO;

import java.util.List;
import java.util.Optional;

public interface LectureListService {

    // insert
    LectureList registerLectureList(LectureList lectureList);

    // select
    List<LectureList> findAllLectureList();

    // select one
    Optional<LectureList> findLectureListById(Long l_list_order);

    // delete
    void deleteLectureList(Long l_list_order);

}
