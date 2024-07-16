package org.zerock.project_academy.member.domain;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "roleSet")
@Builder
public class Member extends BaseEntity{
    @Id
    private Long mno;
    private String name;
    private String password;
    private String phone;
    private String email;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();


    public void changePassword(String password) {
        this.password = password;
    }

}
