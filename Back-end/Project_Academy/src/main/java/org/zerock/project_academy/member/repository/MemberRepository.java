package org.zerock.project_academy.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.member.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    @Query("SELECT m FROM Member m WHERE m.mno = :mno")
    Optional<Member> findByMno(String mno);

    @Query("SELECT m FROM Member m WHERE m.m_name = :mName")
    Optional<Member> findByName(String mName);

    @Query("SELECT m FROM Member m WHERE m.m_email = :email")
    Optional<Member> findByM_email(@Param("email") String email);

    @Query("SELECT m FROM Member m JOIN FETCH m.roleSet WHERE m.mno = :username")
    Optional<Member> findByIdWithRoles(@Param("username") String username);

    @Modifying
    @Transactional
    @Query("update Member m set m.m_name = :mName, m.m_password = :mPassword, m.m_phone = :mPhone, " +
            "m.m_email = :mEmail, m.m_address1 = :mAddress1, m.m_address2 = :mAddress2 where m.mno = :mno")
    void updateMember(
            @Param("mno") String mno,
            @Param("mName") String mName,
            @Param("mPassword") String mPassword,
            @Param("mPhone") String mPhone,
            @Param("mEmail") String mEmail,
            @Param("mAddress1") String mAddress1,
            @Param("mAddress2") String mAddress2
    );
}
