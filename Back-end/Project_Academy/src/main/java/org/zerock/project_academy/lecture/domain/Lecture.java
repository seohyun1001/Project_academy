package org.zerock.project_academy.lecture.domain;

import jakarta.persistence.*;
import lombok.*;
import org.zerock.project_academy.member.domain.Member;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"member_l"})
@Builder
public class Lecture extends BaseEntity {
    @Id
    private String lno;

    private String l_name;
    private String l_category;
    private String l_classroom;

    private LocalDate l_start;
    private LocalDate l_end;

    @ManyToOne
    @JoinColumn(name = "mno", referencedColumnName = "mno")
    private Member member_l;

    public void changeLecture(String l_name, String l_category, String l_classroom) {
        this.l_name = l_name;
        this.l_category = l_category;
        this.l_classroom = l_classroom;
    }

    public void setMember_l(Member member_l) {
        this.member_l = member_l;
    }

}
