package org.zerock.project_academy.student.domain;

import jakarta.persistence.*;
import lombok.*;
import org.zerock.project_academy.lecture.domain.Lecture;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"student_p", "lecture_p"})
@Builder
public class Pay extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pno;

    private boolean paid = false;

    @ManyToOne
    @JoinColumn(name = "sno", referencedColumnName = "sno")
    @JoinColumn(name = "s_name", referencedColumnName = "s_name")
    private Student student_p;

    @ManyToOne
    @JoinColumn(name = "lno", referencedColumnName = "lno")
    @JoinColumn(name = "l_name", referencedColumnName = "l_name")
    private Lecture lecture_p;

}
