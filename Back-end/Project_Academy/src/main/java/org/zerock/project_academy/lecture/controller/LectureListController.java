package org.zerock.project_academy.lecture.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.lecture.domain.LectureList;
import org.zerock.project_academy.lecture.service.LectureListService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lectureList")
@Log4j2
public class LectureListController {

    private final LectureListService lectureListService;

    @PostMapping
    public ResponseEntity<Object> register(@RequestBody LectureList lectureList) {
        return new ResponseEntity<>(lectureListService.registerLectureList(lectureList), HttpStatus.CREATED);
    }
    // -> 아래와 같은 형식으로 넣어야 함
//    {
//        "lecture": {
//        "lno": "3",
//                "l_name": "database"
//    },
//        "member": {
//        "mno": "3002",
//                "m_name": "강사2"
//    },
//        "student": {
//        "sno": "2407001",
//                "s_name": "학생1"
//    }
//    }

    @GetMapping("/list")
    public ResponseEntity<Object> getLectureList() {
        return new ResponseEntity<>(lectureListService.findAllLectureList(), HttpStatus.OK);
    }

    @GetMapping("/read")
    public ResponseEntity<Object> getReadLectureList(@RequestParam Long l_list_order) {
        Optional<LectureList> oneLectureList = lectureListService.findLectureListById(l_list_order);
        if (oneLectureList.isPresent()) {
            return ResponseEntity.ok(oneLectureList.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found with no : " + l_list_order);
        }
    }

    @DeleteMapping("{l_list_order}")
    public ResponseEntity<Object> deleteLectureList(@PathVariable Long l_list_order) {
        lectureListService.deleteLectureList(l_list_order);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
