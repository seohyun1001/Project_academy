package org.zerock.project_academy.member.service;

import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.dto.MemberDTO;

import java.util.List;

public interface MemberService {

    void register(MemberDTO memberDTO);
    Member findByMno(Long mno);

}
