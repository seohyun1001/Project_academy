package org.zerock.project_academy.reference.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceResourceDTO {
    private Long rrno;
    private String rr_name;
    private String rr_path;
    private String rr_type;
    private String rr_ord;
}
