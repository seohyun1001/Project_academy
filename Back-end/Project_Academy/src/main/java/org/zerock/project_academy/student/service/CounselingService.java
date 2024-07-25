package org.zerock.project_academy.student.service;

import org.zerock.project_academy.student.dto.CounselingDTO;

import java.util.List;

public interface CounselingService {

    Long register(CounselingDTO counselingDTO);

    CounselingDTO get(Long cno);

    void modify(CounselingDTO counselingDTO);

    void remove(Long cno);

    List<CounselingDTO> getAll();
}
