package org.zerock.project_academy.student.service;

import org.zerock.project_academy.student.dto.StudentDTO;

import java.util.List;

public interface StudentService {

    Long register(StudentDTO studentDTO);

    StudentDTO get(Long sno);

    void modify(StudentDTO studentDTO);

    void remove(Long sno);

    List<StudentDTO> getAll();
}
