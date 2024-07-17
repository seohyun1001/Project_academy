package org.zerock.project_academy.notice.dto;

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
    private int nr_ord;
    private Long nno;
}
