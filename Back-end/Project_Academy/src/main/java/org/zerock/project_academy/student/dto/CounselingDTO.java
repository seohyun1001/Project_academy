package org.zerock.project_academy.student.dto;

import lombok.*;

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
}
