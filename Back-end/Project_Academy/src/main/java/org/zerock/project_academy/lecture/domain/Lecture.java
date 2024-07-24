package org.zerock.project_academy.lecture.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "lectureList_l")
@Builder
public class Lecture extends BaseEntity {
    @Id
    private String lno;

    private String l_name;
    private String l_category;
    private String l_classroom;

//    @OneToMany(mappedBy = "lecture",
//                cascade = {CascadeType.ALL},
//                fetch = FetchType.LAZY)
//    @Builder.Default
//    @BatchSize(size = 20)
//    private List<LectureList> lectureList_l = new ArrayList<>();

    public void changeLecture(String l_name, String l_category, String l_classroom) {
        this.l_name = l_name;
        this.l_category = l_category;
        this.l_classroom = l_classroom;
    }

    // 컬렉션 요소 추가 메서드
//    public void addLectureList(LectureList lectureList) {
//        lectureList_l.add(lectureList);
//        lectureList.setLecture(this);
//    }

    // 컬렉션 요소 제거 메서드
//    public void removeLectureList(LectureList lectureList) {
//        lectureList_l.remove(lectureList);
//        lectureList.setLecture(null);
//    }
}
