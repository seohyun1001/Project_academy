package org.zerock.project_academy.student.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.student.dto.CounselingDTO;
import org.zerock.project_academy.student.dto.StudentDTO;
import org.zerock.project_academy.student.service.CounselingService;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/counseling")
@CrossOrigin(origins = "localhost:3000")
public class CounselingController {
    private final CounselingService counselingService;

    @PostMapping
    public ResponseEntity<Long> register(@RequestBody CounselingDTO counselingDTO) {

        Long cno = counselingService.register(counselingDTO);

        return ResponseEntity.ok(cno);
    }
}
