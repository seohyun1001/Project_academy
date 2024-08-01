package org.zerock.project_academy.notice.dto;

import lombok.*;
import org.zerock.project_academy.notice.domain.NoticeResource;

@ToString
@Data
@Builder
@AllArgsConstructor
public class NoticeResourceListDTO {
  private Long nrno;
  private String nr_name;
  private String nr_path;
  private String nr_type;
  private Long nno;
  private Long file_size;
  private int nr_ord;
  public NoticeResourceListDTO(){};
  public NoticeResourceListDTO(NoticeResource nr){
    this.nrno = nr.getNrno();
    this.nr_name = nr.getNr_name();
    this.nr_path = nr.getNr_path();
    this.nr_type = nr.getNr_type();
    this.nno = nr.getNotice().getNno();
    this.file_size = nr.getFile_size();
    this.nr_ord = nr.getNr_ord();
  }
}
