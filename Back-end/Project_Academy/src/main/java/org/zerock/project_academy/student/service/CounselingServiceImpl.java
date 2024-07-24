package org.zerock.project_academy.student.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.student.domain.Counseling;
import org.zerock.project_academy.student.domain.Student;
import org.zerock.project_academy.student.dto.CounselingDTO;
import org.zerock.project_academy.student.dto.StudentDTO;
import org.zerock.project_academy.student.repository.CounselingRepository;

@Log4j2
@Service
@RequiredArgsConstructor
public class CounselingServiceImpl implements CounselingService {
    private final ModelMapper modelMapper;
    private final CounselingRepository counselingRepository;

    @Override
    public Long register(CounselingDTO counselingDTO) {

        try{
            Counseling counseling = modelMapper.map(counselingDTO, Counseling.class);

            Long cno = counselingRepository.save(counseling).getCno();

            log.info("등록된 상담이력 " + cno);

            return cno;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("상담이력 등록 에러: " + e.getMessage(), e);
            return null;
        }
    }
}
