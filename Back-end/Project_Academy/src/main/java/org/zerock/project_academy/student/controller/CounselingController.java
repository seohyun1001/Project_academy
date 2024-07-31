package org.zerock.project_academy.student.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.student.dto.CounselingDTO;
import org.zerock.project_academy.student.dto.PayDTO;
import org.zerock.project_academy.student.dto.StudentDTO;
import org.zerock.project_academy.student.service.CounselingService;

import java.util.List;

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

    @GetMapping("/{cno}")
    public ResponseEntity<CounselingDTO> get(@PathVariable Long cno) {

        CounselingDTO counselingDTO = counselingService.get(cno);

        if (counselingDTO != null) {

            return ResponseEntity.ok(counselingDTO);

        } else {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<CounselingDTO>> getAll() {

        List<CounselingDTO> counseling = counselingService.getAll();

        return ResponseEntity.ok(counseling);
    }


    @PutMapping("/{cno}")
    public ResponseEntity<CounselingDTO> modify(@PathVariable Long cno, @RequestBody CounselingDTO counselingDTO) {

        counselingDTO.setCno(cno);
        counselingService.modify(counselingDTO);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cno}")
    public ResponseEntity<Void> delete(@PathVariable Long cno) {

        counselingService.remove(cno);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{sno}")
    public ResponseEntity<List<CounselingDTO>> getBySno(@PathVariable Long sno) {
        List<CounselingDTO> counselingList = counselingService.getBySno(sno);
        if (counselingList != null && !counselingList.isEmpty()) {
            return ResponseEntity.ok(counselingList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
