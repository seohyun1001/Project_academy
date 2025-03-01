package org.zerock.project_academy.student.service;

import org.zerock.project_academy.student.dto.StudentDTO;

import java.util.List;

public interface StudentService {

    Long register(StudentDTO studentDTO);

    StudentDTO get(Long sno);

    void modify(StudentDTO studentDTO);

    void remove(Long sno);

    List<StudentDTO> getAll();

    // 프로필 이미지 URL 업데이트 메서드 추가
    void updateProfileImage(Long sno, String imageUrl);
}
