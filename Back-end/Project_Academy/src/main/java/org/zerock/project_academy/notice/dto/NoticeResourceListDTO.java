package org.zerock.project_academy.notice.dto;

import lombok.*;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeResourceListDTO {
  private Long nrno;
  private String nr_name;
  private String nr_path;
  private String nr_type;
  private Long nno;
  private Long file_size;
  private int nr_ord;
}
