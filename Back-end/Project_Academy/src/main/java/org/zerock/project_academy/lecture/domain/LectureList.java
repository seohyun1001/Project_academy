package org.zerock.project_academy.lecture.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.domain.Student;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
public class LectureList extends BaseEntity {
    @Id
    private Long l_list_order;

    @ManyToOne
    @JoinColumn(name = "lno", referencedColumnName = "lno")
    @JoinColumn(name = "l_name", referencedColumnName = "l_name")
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "mno", referencedColumnName = "mno")
    @JoinColumn(name = "m_name", referencedColumnName = "m_name")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "sno", referencedColumnName = "sno")
    @JoinColumn(name = "s_name", referencedColumnName = "s_name")
    private Student student;

}
