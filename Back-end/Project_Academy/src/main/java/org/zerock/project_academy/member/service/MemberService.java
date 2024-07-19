package org.zerock.project_academy.member.service;

import org.zerock.project_academy.member.dto.MemberDTO;

public interface MemberService {

    void register(MemberDTO memberDTO);

    boolean AvailableMno(String mno);
}
