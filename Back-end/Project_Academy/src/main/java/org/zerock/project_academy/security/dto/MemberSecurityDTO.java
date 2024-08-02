package org.zerock.project_academy.security.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.zerock.project_academy.member.domain.MemberRole;

import java.util.Collection;
import java.util.Set;

@Getter
@Setter
@ToString
public class MemberSecurityDTO extends User {

    private String mno;
    private String m_name;
    private String m_password;
    private String m_phone;
    private String m_email;
    private String m_address1;
    private String m_address2;
    private Set<MemberRole> roleSet;

    public MemberSecurityDTO(String username,
                             String m_name,
                             String password,
                             String phone,
                             String email,
                             String address1,
                             String address2,
                             Set<MemberRole> roleSet,
                             Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);

        this.mno = username;
        this.m_name = m_name;
        this.m_password = password;
        this.m_phone = phone;
        this.m_email = email;
        this.m_address1 = address1;
        this.m_address2 = address2;
        this.roleSet = roleSet;
    }
}
