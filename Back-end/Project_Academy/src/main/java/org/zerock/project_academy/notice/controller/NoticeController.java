package org.zerock.project_academy.notice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.dto.NoticeDTO;
import org.zerock.project_academy.notice.dto.NoticeResourceDTO;
import org.zerock.project_academy.notice.dto.NoticeListDTO;
import org.zerock.project_academy.notice.service.NoticeResourceService;
import org.zerock.project_academy.notice.service.NoticeService;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
@CrossOrigin("http://localhost:3000")
@Log4j2
public class NoticeController {
    private final NoticeService noticeService;
    private final NoticeResourceService noticeResourceService;
    private NoticeDTO noticeDTO;

    //    @GetMapping("/list")
//    public ResponseEntity<List<Notice>> getNoticeList() {
//        return new ResponseEntity<>(noticeService.findAllNotice(), HttpStatus.OK);
//    }
    @GetMapping("/list")
    public List<NoticeListDTO> getNoticeList() {
        return noticeService.findAllNotice();
    }

    @PostMapping(value = "/register", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> addNotice(NoticeDTO noticeDTO) {
        List<NoticeResourceDTO> resourceDtoList = new ArrayList<NoticeResourceDTO>();
        NoticeDTO savedNotice = noticeService.addNotice(noticeDTO);
        if (noticeDTO.getFiles() != null) {
            int ord = 0;
            for (MultipartFile file : noticeDTO.getFiles()) {
                Path savePath = Paths.get("C:\\upload", file.getOriginalFilename());
                try {
                    file.transferTo(savePath);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                NoticeResourceDTO dto = NoticeResourceDTO.builder()
                        .nr_name(file.getOriginalFilename())
                        .nr_ord(ord)
                        .nr_type(file.getContentType())
                        .nno(savedNotice.getNno())
                        .build();
                resourceDtoList.add(dto);
                ord++;
            }
            noticeResourceService.saveAll(resourceDtoList);
        }

        return new ResponseEntity<>(savedNotice, HttpStatus.CREATED);
    }

    @GetMapping("/read")
    public ResponseEntity<Object> getReadNotice(@RequestParam Long nno) {
        Optional<Notice> oneNotice = noticeService.findOneNoticeById(nno);
        if (oneNotice.isPresent()) {
            return new ResponseEntity<>(oneNotice.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notice not found with id " + nno);
        }
    }

    @DeleteMapping("{nno}")
    public ResponseEntity<Object> deleteNotice(@PathVariable Long nno) {
        noticeService.deleteNotice(nno);
        noticeResourceService.deleteNoticeResource(nno);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/modify")
    public ResponseEntity<Object> modifyNotice(@RequestBody NoticeDTO noticeDTO) {
        try {
            Notice modifiedNotice = noticeService.modifyNotice(noticeDTO);
            return new ResponseEntity<>(modifiedNotice, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            log.error("Notice not found with ID: " + noticeDTO.getNno(), e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
