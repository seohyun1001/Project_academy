package org.zerock.project_academy.member;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.dto.MemberDTO;
import org.zerock.project_academy.member.repository.MemberRepository;
import org.zerock.project_academy.member.service.MemberService;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class RegisterMemberTest {

    @Autowired
    private MemberService memberService; // MemberService 빈 주입

    @Autowired
    private MemberRepository memberRepository; // MemberRepository 빈 주입

    @Autowired
    private PasswordEncoder passwordEncoder; // PasswordEncoder 빈 주입

    @Test
    public void testRegister() {
        // 테스트에 사용할 MemberDTO 생성
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMno("1001");
        memberDTO.setM_name("admin");
        memberDTO.setM_password("1234");
        memberDTO.setM_email("test@example.com");
        memberDTO.setM_phone("010-1234-5678");
        memberDTO.setM_address1("Address 1");
        memberDTO.setM_address2("Address 2");

        // 회원 등록 서비스 호출
        memberService.register(memberDTO);

        // 회원 등록 결과 검증
        Member member = memberRepository.findByM_email(memberDTO.getM_email()).orElse(null); // 수정된 메서드 호출
        assertThat(member).isNotNull(); // 회원이 저장되었는지 확인
        assertThat(member.getM_name()).isEqualTo(memberDTO.getM_name()); // 이름이 일치하는지 확인
        assertThat(passwordEncoder.matches(memberDTO.getM_password(), member.getM_password())).isTrue(); // 비밀번호가 암호화되어 저장되었는지 확인
        assertThat(member.getM_email()).isEqualTo(memberDTO.getM_email()); // 이메일이 일치하는지 확인
        assertThat(member.getM_phone()).isEqualTo(memberDTO.getM_phone()); // 전화번호가 일치하는지 확인
        assertThat(member.getM_address1()).isEqualTo(memberDTO.getM_address1()); // 주소1이 일치하는지 확인
        assertThat(member.getM_address2()).isEqualTo(memberDTO.getM_address2()); // 주소2가 일치하는지 확인
    }
}
