package org.zerock.project_academy.student.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.student.domain.Student;
import org.zerock.project_academy.student.dto.StudentDTO;
import org.zerock.project_academy.student.repository.StudentRepository;

@Log4j2
@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final ModelMapper modelMapper;
    private final StudentRepository studentRepository;



    @Override
    public Long register(StudentDTO studentDTO) {

        try{
            Student student = modelMapper.map(studentDTO, Student.class);

            Long sno = studentRepository.save(student).getSno();

            log.info("등록된 학생 sno: " + sno);

            return sno;
        } catch (Exception e) {
            log.error("학생 등록 에러: " + e.getMessage(), e);
            return null;
        }
    }


    
}
