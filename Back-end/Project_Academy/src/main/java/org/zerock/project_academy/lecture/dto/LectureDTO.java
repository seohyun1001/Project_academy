package org.zerock.project_academy.lecture.dto;

import lombok.*;

import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureDTO {

    private String lno;
    private String l_category;
    private String l_classroom;
    private String l_name;
    private LocalDateTime regdate;
    private LocalDateTime moddate;
}
