package org.zerock.project_academy.member.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"roleSet"})
@Builder
public class Member extends BaseEntity{
    @Id
    private String mno;
    private String m_name;
    private String m_password;
    private String m_phone;
    private String m_email;
    private String m_address1;
    private String m_address2;
    private String m_picture;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();

//    @OneToMany(mappedBy = "member",
//            cascade = {CascadeType.ALL},
//            fetch = FetchType.LAZY,
//            orphanRemoval = true)
//    @Builder.Default
//    @BatchSize(size = 20)
//    private List<LectureList> lectureList_m = new ArrayList<>();

    public void changePassword(String m_password) {
        this.m_password = m_password;
    }
}
