package org.zerock.project_academy.notice.dto;

import lombok.*;

import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {

    public Long nno;
    private String writer;
    private String n_title;
    private String n_content;
    private String n_image;
    private LocalDateTime regdate;
    private LocalDateTime moddate;

}
