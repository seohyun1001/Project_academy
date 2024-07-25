package org.zerock.project_academy.student.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.zerock.project_academy.lecture.domain.LectureList;


import java.time.LocalDate;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sno;

    private String s_name;
    private LocalDate s_birthday;
    private String s_phone;
    private String s_address1;
    private String s_address2;
    private String s_email;
    private String s_status;

    private String s_profileImage;


//    @OneToMany(mappedBy = "student",
//            cascade = {CascadeType.ALL},
//            fetch = FetchType.LAZY,
//            orphanRemoval = true)
//    @Builder.Default
//    @BatchSize(size = 20)
//    private List<LectureList> lectureList_s = new ArrayList<>();
}
