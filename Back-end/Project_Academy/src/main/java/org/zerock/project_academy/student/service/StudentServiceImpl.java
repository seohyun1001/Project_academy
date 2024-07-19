package org.zerock.project_academy.student.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.student.domain.Student;
import org.zerock.project_academy.student.dto.StudentDTO;
import org.zerock.project_academy.student.repository.StudentRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
            e.printStackTrace();
            log.error("학생 등록 에러: " + e.getMessage(), e);
            return null;
        }
    }

    // Optional 사용하여 학생을 찾고, 없을 경우 메세지만 출력
    @Override
    public StudentDTO get(Long sno){

        Optional<Student> optionalStudent = studentRepository.findById(sno);

        if(optionalStudent.isPresent()) {

            return modelMapper.map(optionalStudent.get(), StudentDTO.class);
        } else {
            log.info("sno에 해당하는 학생이 없습니다." + sno);

            return null;
        }
    }

    @Override
    public void modify(StudentDTO studentDTO) {

        Student student = modelMapper.map(studentDTO, Student.class);
        studentRepository.save(student);

    }

    @Override
    public void remove(Long sno) {
        studentRepository.deleteById(sno);
    }

    @Override
    public List<StudentDTO> getAll() {
        return studentRepository.findAll().stream()
                .map(student -> modelMapper.map(student, StudentDTO.class))
                .collect(Collectors.toList());
    }
}
