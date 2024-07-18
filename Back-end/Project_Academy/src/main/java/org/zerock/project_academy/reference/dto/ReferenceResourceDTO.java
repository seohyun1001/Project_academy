package org.zerock.project_academy.reference.dto;

import lombok.*;

import java.time.LocalDateTime;

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
    private int rr_ord;
    private Long rno;
}
