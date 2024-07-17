package org.zerock.project_academy.member.domain;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "roleset")
@Builder
public class Member {

    private int mno;
    private String name;
    private String password;
    private String phone;
    private String email;
    private String roleset;
    private LocalDateTime regdate;
    private LocalDateTime moddate;

    public void changePassword(String password) {
        this.password = password;
    }

}


