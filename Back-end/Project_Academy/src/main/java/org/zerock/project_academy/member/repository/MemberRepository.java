package org.zerock.project_academy.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.project_academy.member.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMno(Long mno);
    @Query("SELECT m FROM Member m WHERE m.m_name = :mName")
    Optional<Member> findByName(String mName);
    @Query("SELECT m FROM Member m WHERE m.m_email = :email")
    Optional<Member> findByM_email(@Param("email") String email);
}
