package org.zerock.project_academy.lecture.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureDTO {
    private String lno;

    private String l_name;
    private String l_category;
    private String l_classroom;
}
