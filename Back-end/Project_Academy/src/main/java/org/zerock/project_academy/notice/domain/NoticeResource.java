package org.zerock.project_academy.notice.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "notice")
public class NoticeResource implements Comparable<NoticeResource> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nrno;

    private String nr_name;
    private String nr_path;
    private String nr_type;
    // 카톡에 올려준 create문에는 type이 int로 되어 있는데 int 맞는지
    // -> 일단 String으로 함
    private int nr_ord;

    @ManyToOne
    @JoinColumn(name = "nno", referencedColumnName = "nno")
    private Notice notice;

    @Override
    public int compareTo(NoticeResource nrOther) {
        return this.nr_ord = nrOther.nr_ord;
    }

    public void changeResource_n(Notice notice){
        this.notice = notice;
    }
}
