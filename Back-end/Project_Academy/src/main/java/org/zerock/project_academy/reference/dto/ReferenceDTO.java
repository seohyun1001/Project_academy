package org.zerock.project_academy.reference.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.reference.domain.ReferenceResource;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<ReferenceResourceDTO> reference_resource;
    private List<MultipartFile> files;
    private LocalDateTime modDate;
    private LocalDateTime regDate;
}
