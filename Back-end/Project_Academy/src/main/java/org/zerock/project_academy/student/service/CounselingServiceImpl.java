package org.zerock.project_academy.student.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.repository.LectureRepository;
import org.zerock.project_academy.student.domain.Counseling;
import org.zerock.project_academy.student.domain.Pay;
import org.zerock.project_academy.student.domain.Student;
import org.zerock.project_academy.student.dto.CounselingDTO;
import org.zerock.project_academy.student.dto.PayDTO;
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
            Counseling c = optionalCounseling.get();
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
            return dto;
        } else {
            log.info("cno에 해당하는 상담이력이 없습니다." + cno);
            return null;
        }
    }

    @Override
    public void modify(CounselingDTO counselingDTO) {
        Student student = studentRepository.findById(counselingDTO.getSno())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Lecture lecture = lectureRepository.findById(counselingDTO.getLno())
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        Counseling counseling = counselingRepository.findById(counselingDTO.getCno())
                .orElseThrow(() -> new RuntimeException("Counseling not found"));

        counseling.setC_content(counselingDTO.getC_content());
        counseling.setStudent_c(student);
        counseling.setLecture_c(lecture);

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

    @Override
    public List<CounselingDTO> getBySno(Long sno) {
        List<Counseling> counselings = counselingRepository.findByStudent_c_Sno(sno);
        return counselings.stream()
                .map(counseling -> CounselingDTO.builder()
                        .cno(counseling.getCno())
                        .c_content(counseling.getC_content())
                        .sno(counseling.getStudent_c().getSno())
                        .s_name(counseling.getStudent_c().getS_name())
                        .moddate(counseling.getModDate())
                        .regdate(counseling.getRegDate())
                        .build())
                .collect(Collectors.toList());

    }
}

