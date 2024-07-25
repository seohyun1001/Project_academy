package org.zerock.project_academy.notice.dto;

import lombok.*;
import org.zerock.project_academy.member.domain.Member;

import java.time.LocalDateTime;
import java.util.List;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeListDTO {
  private Long nno;
  private String n_title;
  private String n_content;
  private String n_image;
  private String writer;
  private List<NoticeResourceListDTO> notice_resource;
  private LocalDateTime modDate;
  private LocalDateTime regDate;

}
