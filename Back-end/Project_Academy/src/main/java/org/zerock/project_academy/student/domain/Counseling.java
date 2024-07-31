package org.zerock.project_academy.student.domain;

import jakarta.persistence.*;
import lombok.*;
import org.zerock.project_academy.lecture.domain.Lecture;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"student_c", "lecture_c"})
@Builder
public class Counseling extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cno;

    private String c_content;

    @ManyToOne
    @JoinColumn(name = "sno", referencedColumnName = "sno")
    @JoinColumn(name = "s_name", referencedColumnName = "s_name")
    private Student student_c;

    @ManyToOne
    @JoinColumn(name = "lno", referencedColumnName = "lno")
    @JoinColumn(name = "l_name", referencedColumnName = "l_name")
    private Lecture lecture_c;
}
