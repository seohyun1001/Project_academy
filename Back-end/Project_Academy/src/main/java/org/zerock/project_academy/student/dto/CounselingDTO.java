package org.zerock.project_academy.student.dto;

import lombok.*;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.student.domain.Student;

import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CounselingDTO {

    public Long cno;
    private String c_content;
    private String lno;
    private String l_name;
    private Long sno;
    private String s_name;
    private LocalDateTime regdate;
    private LocalDateTime moddate;

//    public void setLno(Lecture lecture) {
//        this.lno = lecture.getLno();
//    }
//
//    public void setL_name(Lecture lecture) {
//        this.l_name = lecture.getL_name();
//    }
//
//    public void setS_name(Student student) {
//        this.s_name = student.getS_name();
//    }
//
//    public void setSno(Student student) {
//        this.sno = student.getSno();
//    }
}
