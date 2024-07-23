package org.zerock.project_academy.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.domain.MemberRole;
import org.zerock.project_academy.member.dto.MemberDTO;
import org.zerock.project_academy.member.repository.MemberRepository;

import java.util.HashSet;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public void register(MemberDTO memberDTO) {
        log.info(modelMapper);
        // DTO를 Entity로 변환
        Member member = modelMapper.map(memberDTO, Member.class);
        // 비밀번호 암호화
        member.changePassword(passwordEncoder.encode(memberDTO.getM_password()));
        // roleSet 초기화
        if (member.getRoleSet() == null) {
            member.setRoleSet(new HashSet<>());
        }
        // 기본 역할 설정
        member.getRoleSet().add(MemberRole.TEACHER);

        log.info("-------------------------------------------------");
        log.info(member);

        // 회원 정보 저장
        memberRepository.save(member);
    }

    public Optional<Member> findByMno(Long mno){
        return memberRepository.findByMno(mno);
    }
}
