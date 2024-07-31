package org.zerock.project_academy.lecture.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureDTO {
    private String lno;

    private String l_name;
    private String l_category;
    private String l_classroom;

    private LocalDate l_start;
    private LocalDate l_end;

    private String mno;
}
