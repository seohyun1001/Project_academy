package org.zerock.project_academy.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.zerock.project_academy.lecture.domain.LectureList;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"roleSet", "lectureList_m"})
@Builder
public class Member extends BaseEntity{
    @Id
    private Long mno;
    private String m_name;
    private String m_password;
    private String m_phone;
    private String m_email;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();

    @OneToMany(mappedBy = "member",
            cascade = {CascadeType.ALL},
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    @Builder.Default
    @BatchSize(size = 20)
    private List<LectureList> lectureList_m = new ArrayList<>();

    public void changePassword(String m_password) {
        this.m_password = m_password;
    }

}
