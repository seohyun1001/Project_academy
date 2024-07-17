package org.zerock.project_academy.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.repository.MemberRepository;
import org.zerock.project_academy.security.dto.MemberSecurityDTO;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Long mno;
        try {
            mno = Long.valueOf(username);
        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("Invalid user ID format");
        }
        return loadUserByMno(mno);
    }

    public UserDetails loadUserByMno(Long mno) throws UsernameNotFoundException {
        Optional<Member> result = memberRepository.findByMno(mno);

        Member member = result.orElseThrow(() -> new UsernameNotFoundException("User not found"));

        MemberSecurityDTO dto = new MemberSecurityDTO(
                member.getMno(),
                member.getM_name(),
                member.getM_password(),
                member.getM_phone(),
                member.getM_email(),
                member.getM_address1(),
                member.getM_address2(),
                List.of(new SimpleGrantedAuthority("ROLE_TEACHER"))
        );
        log.info(dto);
        return dto;
    }
}
