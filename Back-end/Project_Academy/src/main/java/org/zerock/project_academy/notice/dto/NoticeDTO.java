package org.zerock.project_academy.notice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {
    @NotNull
    private Long nno;
    private String title;
    private String content;
    private String image;
    private LocalDateTime moddate;
    private LocalDateTime regdate;
}
