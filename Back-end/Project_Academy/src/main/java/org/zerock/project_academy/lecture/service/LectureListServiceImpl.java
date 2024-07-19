package org.zerock.project_academy.lecture.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.domain.LectureList;
import org.zerock.project_academy.lecture.dto.LectureDTO;
import org.zerock.project_academy.lecture.dto.LectureListDTO;
import org.zerock.project_academy.lecture.repository.LectureListRepository;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class LectureListServiceImpl implements LectureListService {

    private final LectureListRepository lectureListRepository;

    @Override
    public LectureList registerLectureList(LectureList lectureList) {
        return lectureListRepository.save(lectureList);
    }

    @Override
    public List<LectureList> findAllLectureList() {
        return lectureListRepository.findAll();
    }

    @Override
    public Optional<LectureList> findLectureListById(Long l_list_order) {
        return lectureListRepository.findById(l_list_order);
    }

    @Override
    public void deleteLectureList(Long l_list_order) {
        lectureListRepository.deleteById(l_list_order);
    }
}
