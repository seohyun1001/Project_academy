package org.zerock.project_academy.notice.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeResourceDTO {
    private Long nrno;
    private String nr_name;
    private String nr_path;
    private String nr_type;
    @NotNull
    private int nr_ord;
}
