package org.zerock.project_academy.reference.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.zerock.project_academy.reference.domain.ReferenceResource;

import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
public class ReferenceResourceDTO {

    private Long rrno;
    private String rr_name;
    private String rr_path;
    private String rr_type;
    private Long rno;
    @Column
    private Long file_size;
    @NotNull
    private int rr_ord;

}
