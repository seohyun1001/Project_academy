package org.zerock.project_academy.student.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.repository.LectureRepository;
import org.zerock.project_academy.student.domain.Pay;
import org.zerock.project_academy.student.domain.Student;
import org.zerock.project_academy.student.dto.PayDTO;
import org.zerock.project_academy.student.repository.PayRepository;
import org.zerock.project_academy.student.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService {

    private final ModelMapper modelMapper;
    private final PayRepository payRepository;
    private final LectureRepository lectureRepository;
    private final StudentRepository studentRepository;

    @Override
    public Long register(PayDTO payDTO) {
        Student student = studentRepository.findById(payDTO.getSno())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Lecture lecture = lectureRepository.findById(payDTO.getLno())
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        // ModelMapper를 사용하여 PayDTO를 Pay 엔티티로 변환
        Pay pay = modelMapper.map(payDTO, Pay.class);

        // Student와 Lecture를 수동으로 설정
        pay.setStudent_p(student);
        pay.setLecture_p(lecture);

        Pay savedPay = payRepository.save(pay);
        return savedPay.getPno();
    }

    @Override
    public PayDTO get(Long pno) {
        Optional<Pay> optionalPay = payRepository.findById(pno);

        if (optionalPay.isPresent()) {
            Pay p = optionalPay.get();
            PayDTO dto = PayDTO.builder()
                    .pno(p.getPno())
                    .paid(p.isPaid())
                    .lno(p.getLecture_p().getLno())
                    .l_name(p.getLecture_p().getL_name())
                    .sno(p.getStudent_p().getSno())
                    .s_name(p.getStudent_p().getS_name())
                    .moddate(p.getModDate())
                    .regdate(p.getRegDate())
                    .build();
            return dto;
        } else {
            log.info("pno에 해당하는 수납내역이 없습니다." + pno);
            return null;
        }
    }

    @Override
    public void modify(PayDTO payDTO) {
        Student student = studentRepository.findById(payDTO.getSno())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Lecture lecture = lectureRepository.findById(payDTO.getLno())
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        Pay pay = payRepository.findById(payDTO.getPno())
                .orElseThrow(() -> new RuntimeException("Pay not found"));

        pay.setPaid(payDTO.isPaid());
        pay.setStudent_p(student);
        pay.setLecture_p(lecture);

        payRepository.save(pay);
    }

    @Override
    public void remove(Long pno) {
        payRepository.deleteById(pno);
    }

    @Override
    public List<PayDTO> getAll() {
        List<Pay> list = payRepository.findAll();
        List<PayDTO> dtoList = new ArrayList<>();
        for (Pay p : list) {
            PayDTO dto = PayDTO.builder()
                    .pno(p.getPno())
                    .paid(p.isPaid())
                    .lno(p.getLecture_p().getLno())
                    .l_name(p.getLecture_p().getL_name())
                    .sno(p.getStudent_p().getSno())
                    .s_name(p.getStudent_p().getS_name())
                    .moddate(p.getModDate())
                    .regdate(p.getRegDate())
                    .build();
            dtoList.add(dto); // dtoList에 추가
        }
        return dtoList;
    }

}
