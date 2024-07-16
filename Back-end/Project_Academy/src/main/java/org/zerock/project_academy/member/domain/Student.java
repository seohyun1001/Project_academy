package org.zerock.project_academy.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.zerock.project_academy.lecture.domain.LectureList;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Student extends BaseEntity {
    @Id
    private Long sno;

    private String s_name;
    private String s_email;
    private String s_phone;
    private String s_status;

    @OneToMany(mappedBy = "student",
            cascade = {CascadeType.ALL},
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    @Builder.Default
    @BatchSize(size = 20)
    private List<LectureList> lectureSet_s = new ArrayList<>();
}
