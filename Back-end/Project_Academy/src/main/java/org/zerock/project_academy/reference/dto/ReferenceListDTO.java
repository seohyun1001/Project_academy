package org.zerock.project_academy.reference.dto;

import lombok.*;
import org.zerock.project_academy.reference.domain.ReferenceResource;

import java.time.LocalDateTime;
import java.util.List;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceListDTO {
    private Long rno;
    private String r_title;
    private String r_content;
    private String r_image;
    private String writer;
    private List<ReferenceResourceListDTO> references_resource;
    private LocalDateTime modDate;
    private LocalDateTime regDate;
}
