package org.zerock.project_academy.member.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.zerock.project_academy.member.domain.MemberRole;

import java.time.LocalDateTime;
import java.util.Set;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MemberDTO {
    @NotEmpty
    private Long mno;
    @NotEmpty
    private String m_name;
    @NotEmpty
    private String m_password;
    private String m_phone;
    private String m_email;
    private String m_address1;
    private String m_address2;
    private LocalDateTime regdate;
    private LocalDateTime moddate;
    private Set<MemberRole> roleSet;
}
