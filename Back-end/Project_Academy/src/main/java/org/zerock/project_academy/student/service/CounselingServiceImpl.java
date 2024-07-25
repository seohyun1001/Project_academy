package org.zerock.project_academy.student.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.repository.LectureRepository;
import org.zerock.project_academy.student.domain.Counseling;
import org.zerock.project_academy.student.domain.Student;
import org.zerock.project_academy.student.dto.CounselingDTO;
import org.zerock.project_academy.student.repository.CounselingRepository;
import org.zerock.project_academy.student.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class CounselingServiceImpl implements CounselingService {
    private final ModelMapper modelMapper;
    private final CounselingRepository counselingRepository;
    private final LectureRepository lectureRepository;
    private final StudentRepository studentRepository;

    @Override
    public Long register(CounselingDTO counselingDTO) {
        Student student = studentRepository.findById(counselingDTO.getSno())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Lecture lecture = lectureRepository.findById(counselingDTO.getLno())
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        // ModelMapper를 사용하여 CounselingDTO를 Counseling 엔티티로 변환
        Counseling counseling = modelMapper.map(counselingDTO, Counseling.class);

        // Student와 Lecture를 수동으로 설정
        counseling.setStudent_c(student);
        counseling.setLecture_c(lecture);

        Counseling savedCounseling = counselingRepository.save(counseling);
        return savedCounseling.getCno();
    }


    @Override
    public CounselingDTO get(Long cno) {

        Optional<Counseling> optionalCounseling = counselingRepository.findById(cno);

        if (optionalCounseling.isPresent()) {

            return modelMapper.map(optionalCounseling.get(), CounselingDTO.class);
        } else {
            log.info("cno에 해당하는 상담이력이 없습니다." + cno);

            return null;
        }
    }

    @Override
    public void modify(CounselingDTO counselingDTO) {

        Counseling counseling = modelMapper.map(counselingDTO, Counseling.class);
        counselingRepository.save(counseling);
    }

    @Override
    public void remove(Long cno) {
        counselingRepository.deleteById(cno);
    }

    @Override
    public List<CounselingDTO> getAll() {
        List<Counseling> list = counselingRepository.findAll();
        List<CounselingDTO> dtoList = new ArrayList<>();
        for (Counseling c : list) {
            CounselingDTO dto = CounselingDTO.builder()
                    .cno(c.getCno())
                    .c_content(c.getC_content())
                    .lno(c.getLecture_c().getLno())
                    .l_name(c.getLecture_c().getL_name())
                    .sno(c.getStudent_c().getSno())
                    .s_name(c.getStudent_c().getS_name())
                    .moddate(c.getModDate())
                    .regdate(c.getRegDate())
                    .build();
            dtoList.add(dto); // dtoList에 추가
        }
        return dtoList;
    }
}
