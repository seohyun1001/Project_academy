package org.zerock.project_academy.student.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.student.dto.CounselingDTO;
import org.zerock.project_academy.student.dto.PayDTO;
import org.zerock.project_academy.student.service.PayService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/pay")
@CrossOrigin(origins = "localhost:3000")
public class PayController {

    private final PayService payService;

    @PostMapping
    public ResponseEntity<Long> register(@RequestBody PayDTO payDTO) {

        Long pno = payService.register(payDTO);

        return ResponseEntity.ok(pno);
    }

    @GetMapping("/{pno}")
    public ResponseEntity<PayDTO> get(@PathVariable Long pno) {

        PayDTO payDTO = payService.get(pno);

        if (payDTO != null) {

            return ResponseEntity.ok(payDTO);

        } else {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PayDTO>> getAll() {

        List<PayDTO> pay = payService.getAll();

        return ResponseEntity.ok(pay);
    }

    @PutMapping("/{pno}")
    public ResponseEntity<PayDTO> modify(@PathVariable Long pno, @RequestBody PayDTO payDTO) {

        payDTO.setPno(pno);
        payService.modify(payDTO);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{pno}")
    public ResponseEntity<Void> delete(@PathVariable Long pno) {

        payService.remove(pno);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{sno}")
    public ResponseEntity<List<PayDTO>> getBySno(@PathVariable Long sno) {
        List<PayDTO> payList = payService.getBySno(sno);
        if (payList != null && !payList.isEmpty()) {
            return ResponseEntity.ok(payList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
