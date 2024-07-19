package org.zerock.project_academy.lecture.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureListDTO {

    private Long l_list_order;
    private String lno;
    private String l_name;
    private Long mno;
    private String m_name;
    private Long sno;
    private String s_name;
}
