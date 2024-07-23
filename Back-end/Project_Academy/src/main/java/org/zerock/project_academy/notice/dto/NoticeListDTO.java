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
  private String writer_mno;
  private List<NoticeResourceListDTO> notice_resource;
  private LocalDateTime modDate;
  private LocalDateTime regDate;

  public void setWriter(Member member) {
    this.writer = member.getM_name();
  }
  public void setWriter_mno(Member member) {
    this.writer_mno = member.getMno();
  }
}
