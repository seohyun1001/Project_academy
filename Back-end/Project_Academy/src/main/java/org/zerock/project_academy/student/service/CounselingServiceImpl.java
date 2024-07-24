package org.zerock.project_academy.student.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.student.domain.Counseling;
import org.zerock.project_academy.student.dto.CounselingDTO;
import org.zerock.project_academy.student.repository.CounselingRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class CounselingServiceImpl implements CounselingService {
    private final ModelMapper modelMapper;
    private final CounselingRepository counselingRepository;

    @Override
    public Long register(CounselingDTO counselingDTO) {

        try {
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
        return counselingRepository.findAll().stream()
                .map(counseling -> modelMapper.map(counseling, CounselingDTO.class))
                .collect(Collectors.toList());
    }
}
