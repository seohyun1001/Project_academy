package org.zerock.project_academy.notice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.service.NoticeService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("/list")
    public ResponseEntity<Object> getNoticeList() {
        return new ResponseEntity<>(noticeService.findAllNotice(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Object> addNotice(@RequestBody Notice notice) {
        return new ResponseEntity<>(noticeService.addNotice(notice), HttpStatus.CREATED);
    }
    @GetMapping("/read")
    public ResponseEntity<Object> getReadNotice(@RequestParam Long nno) {
        Optional<Notice> oneNotice = noticeService.findOneNoticeById(nno);
        if(oneNotice.isPresent()) {
            return new ResponseEntity<>(oneNotice.get(), HttpStatus.OK);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lecture not found with id " + nno);
        }
    }
}
