package org.zerock.project_academy.student.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.student.dto.StudentDTO;
import org.zerock.project_academy.student.service.StudentService;

import java.util.List;

// Registration
@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
@Log4j2
@CrossOrigin(origins = "localhost:3000")
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<Long> register(@RequestBody StudentDTO studentDTO) {

        Long sno = studentService.register(studentDTO);

        return ResponseEntity.ok(sno);
    }

    @GetMapping("/{sno}")
    public ResponseEntity<StudentDTO> get(@PathVariable Long sno) {

        StudentDTO studentDTO = studentService.get(sno);

        if(studentDTO != null){

            return ResponseEntity.ok(studentDTO);

        } else {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAll() {

        List<StudentDTO> student = studentService.getAll();

        return ResponseEntity.ok(student);
    }


    @PutMapping("/{sno}")
    public ResponseEntity<StudentDTO> modify(@PathVariable Long sno, @RequestBody StudentDTO studentDTO) {

        studentDTO.setSno(sno);
        studentService.modify(studentDTO);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{sno}")
    public ResponseEntity<Void> delete(@PathVariable Long sno) {

        studentService.remove(sno);

        return ResponseEntity.noContent().build();
    }
}
