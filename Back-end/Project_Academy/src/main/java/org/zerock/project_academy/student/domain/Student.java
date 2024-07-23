package org.zerock.project_academy.student.domain;

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
@ToString(exclude = "lectureList_s")
@Builder
public class Student extends BaseEntity {
    @Id
    private Long sno;

    private String s_name;
    private String s_email;
    private String s_phone;
    private String s_status;
    private String s_address1;
    private String s_address2;

//    @OneToMany(mappedBy = "student",
//            cascade = {CascadeType.ALL},
//            fetch = FetchType.LAZY,
//            orphanRemoval = true)
//    @Builder.Default
//    @BatchSize(size = 20)
//    private List<LectureList> lectureList_s = new ArrayList<>();
}
