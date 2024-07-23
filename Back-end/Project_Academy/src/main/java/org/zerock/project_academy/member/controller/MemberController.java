package org.zerock.project_academy.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.dto.MemberDTO;
import org.zerock.project_academy.member.service.MemberService;

import java.util.Optional;
@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

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

    @GetMapping("/read/{mno}")
    public Optional<Member> memberRead(@PathVariable("mno") String mno) {
        return memberService.findByMno(mno);
    }

    @PutMapping("/modify/{mno}")
    public ResponseEntity<Member> modifyMember(
            @PathVariable String mno,
            @RequestBody Member memberDetails) {
        Member updatedMember = memberService.modifyMember(mno, memberDetails);
        if (updatedMember != null) {
            return ResponseEntity.ok(updatedMember);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}


