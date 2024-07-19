package org.zerock.project_academy.reference.dto;

import lombok.*;

import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceDTO {

    private Long rno;
    private String writer;
    private String r_title;
    private String r_content;
    private String r_image;
    private LocalDateTime regdate;
    private LocalDateTime moddate;

}
