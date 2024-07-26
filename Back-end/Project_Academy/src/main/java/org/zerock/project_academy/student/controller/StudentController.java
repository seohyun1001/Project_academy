package org.zerock.project_academy.student.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.zerock.project_academy.student.dto.StudentDTO;
import org.zerock.project_academy.student.service.StudentService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

// Registration
@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentService studentService;

    @Value("${org.zerock.upload.path}")
    private String baseUploadDir;

    private final String uploadDir = "studentProfile/";


    @PostMapping("/register")
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

    @PostMapping("/uploadProfileImage/{sno}")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long sno, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("선택된 파일이 없습니다.");
        }

        try {
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + "_" + file.getOriginalFilename();

            // 파일 저장 경로 설정
            Path path = Paths.get(baseUploadDir, uploadDir, fileName);

            // 디렉토리가 없는 경우 생성
            Files.createDirectories(path.getParent());

            // 파일을 지정된 경로에 저장
            file.transferTo(path);

            // 이미지 URL 생성
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/student/images/")
                    .path(fileName)
                    .toUriString();

            // 학생의 프로필 이미지 URL 업데이트
            studentService.updateProfileImage(sno, imageUrl);

            return ResponseEntity.ok(imageUrl);

        } catch (IOException e) {
            // 에러 로그 기록
            log.error("Failed to upload image", e);

            // 클라이언트에게 적절한 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("다음과 같은 문제로 업로드에 실패함: " + e.getMessage());
        }
    }
}
