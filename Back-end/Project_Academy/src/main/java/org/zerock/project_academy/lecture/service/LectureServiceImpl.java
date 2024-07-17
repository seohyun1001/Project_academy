package org.zerock.project_academy.lecture.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.dto.LectureDTO;
import org.zerock.project_academy.lecture.dto.PageRequestDTO;
import org.zerock.project_academy.lecture.dto.PageResponseDTO;
import org.zerock.project_academy.lecture.repository.LectureRepository;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class LectureServiceImpl implements LectureService {

    private final ModelMapper modelMapper;
    private final LectureRepository lectureRepository;

    @Override
    public Lecture registerLecture(Lecture lecture) {
        return lectureRepository.save(lecture);
    }

    @Override
    public List<Lecture> findAllLectures() {
        return lectureRepository.findAll();
    }

    @Override
    public Optional<Lecture> findOneLectureById(String lno) {
        return Optional.empty();
    }

    @Override
    public LectureDTO readOne(String lno) {
        return null;
    }

    @Override
    public PageResponseDTO<LectureDTO> searchLecture(PageRequestDTO pageRequestDTO) {
        return null;
    }

    @Override
    public void modifyLecture(LectureDTO lectureDTO) {

    }

    @Override
    public void deleteLecture(String lno) {

    }
}
