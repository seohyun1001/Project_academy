package org.zerock.project_academy.lecture.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.dto.LectureDTO;
import org.zerock.project_academy.lecture.service.LectureService;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture")
@Log4j2
public class LectureController {

    private final LectureService lectureService;

    @PostMapping
    public ResponseEntity<Object> register(@RequestBody Lecture lecture) {
        return new ResponseEntity<>(lectureService.registerLecture(lecture), HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<Object> getAllLectures() {
        return new ResponseEntity<>(lectureService.findAllLectures(), HttpStatus.OK);
    }

    @GetMapping("/read")
    public ResponseEntity<Object> getLectureById(@RequestParam String lno) {
        // postman에서 'form-data' key=lno, value=1로 조회함
        Optional<Lecture> oneLecture = lectureService.findOneLectureById(lno);

        if (oneLecture.isPresent()) {
            return ResponseEntity.ok(oneLecture.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lecture not found with id " + lno);
        }
    }

    @DeleteMapping("{lno}")
    public ResponseEntity<Object> deleteLecture(@PathVariable String lno) {
        lectureService.deleteLecture(lno);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/modify")
    public ResponseEntity<Object> modifyLecture(@RequestBody LectureDTO lectureDTO) {
        try {
            Lecture modifiedLecture = lectureService.modifyLecture(lectureDTO);
            return new ResponseEntity<>(modifiedLecture, HttpStatus.OK);
        } catch (NoSuchElementException e){
            log.error("Lecture not found with ID: " + lectureDTO.getLno(), e);
            return new ResponseEntity<>("Lecture not found with ID: " + lectureDTO.getLno(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            log.error("Error modifying lecture", e);
            return new ResponseEntity<>("Error modifying lecture", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}