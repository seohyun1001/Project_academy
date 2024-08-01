package org.zerock.project_academy.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.repository.MemberRepository;
import org.zerock.project_academy.security.dto.MemberSecurityDTO;
import org.zerock.project_academy.security.util.JWTUtil;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final JWTUtil jWTUtil;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Member> result = memberRepository.findByIdWithRoles(username);


        log.info("--------------------------------------------------------" + result);
        Member member = result.orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Collection<? extends GrantedAuthority> authorities = member.getRoleSet().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toList());

        log.info("=================================== " + authorities);

        MemberSecurityDTO dto = new MemberSecurityDTO(
                member.getMno(),
                member.getM_name(),
                member.getM_password(),
                member.getM_phone(),
                member.getM_email(),
                member.getM_address1(),
                member.getM_address2(),
                member.getRoleSet(),
                //ROLE_ADMIN, ROLE_TEACHER
                authorities
        );
        log.info(dto);
        return dto;
    }
}
