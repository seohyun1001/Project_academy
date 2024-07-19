package org.zerock.project_academy.notice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.notice.domain.NoticeResource;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {
    @NotNull
    private Long nno;
    private String n_title;
    private String n_content;
    private String n_image;
    private String writer;
    private LocalDateTime modDate;
    private LocalDateTime regDate;
    private Set<NoticeResource> noticeResourceSet;
    private List<MultipartFile> files;
}
