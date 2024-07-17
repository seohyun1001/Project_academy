package org.zerock.project_academy.reference.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceDTO {
    private Long rno;
    private String r_title;
    private String r_content;
    private String r_image;
}
