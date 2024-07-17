package org.zerock.project_academy.lecture.dto;

import lombok.*;

import java.time.LocalDateTime;

@ToString
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
    private LocalDateTime regdate;
    private LocalDateTime moddate;
}
