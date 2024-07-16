package org.zerock.project_academy.lecture.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "lectureSet")
@Builder
public class Lecture extends BaseEntity {
    @Id
    private String lno;

    private String l_name;
    private String l_category;
    private String l_classroom;
    private Long mno;

    @OneToMany(mappedBy = "lecture",
                cascade = {CascadeType.ALL},
                fetch = FetchType.LAZY,
                orphanRemoval = true)
    @Builder.Default
    @BatchSize(size = 20)
    private List<LectureList> lectureSet_l = new ArrayList<>();

}
