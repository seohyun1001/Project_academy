package org.zerock.project_academy.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.dto.MemberDTO;
import org.zerock.project_academy.member.service.MemberService;

import java.util.Map;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @Value("${org.zerock.upload.path}")
    private String uploadPath;


    @GetMapping("/read/{mno}")
    public Optional<Member> memberRead(@PathVariable("mno") String mno) {
        return memberService.findByMno(mno);
    }

    @PutMapping("/modify/{mno}")
    public ResponseEntity<Member> modifyMember(
            @PathVariable("mno") String mno,
            MemberDTO memberDetails,
            MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // 파일 저장 로직
            String filePath = saveProfilePicture(file);
            memberDetails.setM_picture(filePath);

            Member updatedMember = memberService.modifyMember(mno, memberDetails);
            if (updatedMember != null) {
                return ResponseEntity.ok(updatedMember);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    private String saveProfilePicture(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadPath + "\\profile_pictures\\" + fileName);
        file.transferTo(filePath);
        return "http://localhost:8092/profile_pictures/" + fileName;
//        return fileName; // 파일 경로 반환
    }

    @GetMapping("/list")
    public List<Member> getMembers() {
        return memberService.getAllMembers();
    }

    @DeleteMapping("/delete/{mno}")
    public ResponseEntity<Void> deleteMember(@PathVariable String mno) {
        memberService.deleteMember(mno);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody MemberDTO memberDTO) {
        log.info("Member registration request: {}", memberDTO);

        memberService.register(memberDTO);

        try {
            memberService.register(memberDTO);
            return new ResponseEntity<>("Member registered successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error during member registration: {}", e.getMessage());
            return new ResponseEntity<>("Member registration failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestBody Map<String, String> request) {
        String mno = request.get("mno");
        boolean available = memberService.AvailableMno(mno);
        return ResponseEntity.ok(Map.of("available", available));
    }

}


