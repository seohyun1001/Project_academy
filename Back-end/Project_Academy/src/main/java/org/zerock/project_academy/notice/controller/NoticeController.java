package org.zerock.project_academy.notice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.dto.FileListDTO;
import org.zerock.project_academy.notice.dto.NoticeDTO;
import org.zerock.project_academy.notice.dto.NoticeResourceDTO;
import org.zerock.project_academy.notice.service.NoticeResourceService;
import org.zerock.project_academy.notice.service.NoticeService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
    private final NoticeService noticeService;
    private final NoticeResourceService noticeResourceService;
    private NoticeDTO noticeDTO;

    @GetMapping("/list")
    public ResponseEntity<Object> getNoticeList() {
        return new ResponseEntity<>(noticeService.findAllNotice(), HttpStatus.OK);
    }
    @PostMapping(value= "/register", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> addNotice(NoticeDTO noticeDTO) {
        List<NoticeResourceDTO> resourceDtoList = new ArrayList<NoticeResourceDTO>();
        NoticeDTO savedNotice = noticeService.addNotice(noticeDTO);
        if(noticeDTO.getFiles() != null){
            int ord = 0;
            for(MultipartFile file : noticeDTO.getFiles()){
                Path savePath = Paths.get("C:\\upload", file.getOriginalFilename());
                try{
                    file.transferTo(savePath);
                }catch(Exception e){
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
        if(oneNotice.isPresent()) {
            return new ResponseEntity<>(oneNotice.get(), HttpStatus.OK);
        }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notice not found with id " + nno);
        }
    }
    @DeleteMapping("{nno}")
    public ResponseEntity<Object> deleteNotice(@PathVariable Long nno) {
        noticeService.deleteNotice(nno);
        noticeResourceService.deleteNoticeResource(nno);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/modify")
    public ResponseEntity<Object> modifyNotice(NoticeDTO noticeDTO, Model model) {
        noticeDTO.setNno(noticeDTO.getNno());
        model.addAttribute("noticeDTO", noticeDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
