package org.zerock.project_academy.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.dto.MemberDTO;
import org.zerock.project_academy.member.service.MemberService;
import org.zerock.project_academy.member.service.MemberServiceImpl;

import java.util.Optional;

@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final MemberServiceImpl memberServiceImpl;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody MemberDTO memberDTO) {
        log.info("Member registration request: {}", memberDTO);

        memberService.register(memberDTO);

        return new ResponseEntity<>("Member registered successfully", HttpStatus.CREATED);
    }

    @GetMapping("/modify")
    public String modify(long mno, Model model) {
        Member member = memberService.findByMno(mno);
        model.addAttribute("member", member);
        return "/modify";
    }




}
