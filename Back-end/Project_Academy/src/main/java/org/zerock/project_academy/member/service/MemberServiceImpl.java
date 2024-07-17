package org.zerock.project_academy.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.dto.MemberDTO;
import org.zerock.project_academy.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void register(MemberDTO memberDTO){
        log.info(modelMapper);
        Member member = modelMapper.map(memberDTO, Member.class);
        member.changePassword(passwordEncoder.encode(memberDTO.getM_password()));

        log.info("-------------------------------------------------");
        log.info(member);

        memberRepository.save(member);
    }
}
