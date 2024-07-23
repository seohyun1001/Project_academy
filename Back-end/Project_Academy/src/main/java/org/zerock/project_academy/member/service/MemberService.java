package org.zerock.project_academy.member.service;

import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.dto.MemberDTO;

import java.util.List;
import java.util.Optional;

public interface MemberService {

    void register(MemberDTO memberDTO);
    Optional<Member> findByMno(String mno);
    Member modifyMember(String mno, Member memberDetails);
}
