package org.zerock.project_academy.notice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.project_academy.notice.service.NoticeResourceService;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice/files")
@Log4j2
public class NoticeResourceController {
    private final NoticeResourceService noticeResourceService;
    private final Path fileStorageLocation = Paths.get("file-storage").toAbsolutePath().normalize();

    @DeleteMapping("{nrno}")
    public ResponseEntity<Object> deleteFile(@PathVariable long nrno) {
        log.info("nrno----------------------------------------" + nrno);
        noticeResourceService.deleteNoticeResource(nrno);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
