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
import java.util.List;
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

    public boolean AvailableMno(String mno) {
        return !memberRepository.existsByMno(mno);
    }

    public Optional<Member> findByMno(String mno) {
        return memberRepository.findByMno(mno);
    }

    @Override
    public Member modifyMember(String mno, MemberDTO memberDetails) {
        try {
            Optional<Member> result = memberRepository.findByMno(mno);
            Member member = result.orElseThrow();
            member.setM_name(memberDetails.getM_name());
            member.setM_phone(memberDetails.getM_phone());
            member.setM_email(memberDetails.getM_email());
            member.setM_address1(memberDetails.getM_address1());
            member.setM_address2(memberDetails.getM_address2());
            member.setM_picture(memberDetails.getM_picture());
            memberRepository.save(member);
            return member;
        } catch (Exception e) {
            // 로그를 남기거나 예외를 처리합니다.
            e.printStackTrace();
            throw e; // 예외를 다시 던져서 상위 레벨에서 처리할 수 있게 합니다.
        }

    }

    @Override
    public void deleteMember(String mno) {
        if (memberRepository.existsById(mno)){
            memberRepository.deleteById(mno);
        }
    }

    @Override
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
}
