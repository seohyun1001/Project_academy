package org.zerock.project_academy.member.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    @NotEmpty
    private int mno;
    @NotEmpty
    private String name;
    @NotEmpty
    private String password;
    private String phone;
    private String email;
    private LocalDateTime regdate;
    private LocalDateTime moddate;

}
