package org.zerock.project_academy.member;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.repository.MemberRepository;

import java.util.Optional;

@SpringBootTest
public class MemberRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void testFindMemberByMno() {
        Long mno = 1001L;

        Optional<Member> result = memberRepository.findByMno(mno);

        Member member = result.orElseThrow();
        System.out.println(member);

    }
}
