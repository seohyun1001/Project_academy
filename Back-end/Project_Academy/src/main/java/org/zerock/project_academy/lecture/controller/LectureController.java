package org.zerock.project_academy.lecture.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.service.LectureService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture")
public class LectureController {

    private final LectureService lectureService;

    @PostMapping
    public ResponseEntity<Object> register(@RequestBody Lecture lecture) {
        return new ResponseEntity<>(lectureService.registerLecture(lecture), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Object> getAllLectures() {
        return new ResponseEntity<>(lectureService.findAllLectures(), HttpStatus.OK);
    }

}
