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
    private Long file_size;
    private int nr_ord;
    @Override
    public int compareTo(NoticeResource nrOther) {
        return this.nr_ord = nrOther.nr_ord;
    }

//    @ManyToOne(fetch = FetchType.LAZY)
//    private Long nno;

    @ManyToOne
    @JoinColumn( name = "nno", referencedColumnName = "nno")
    private Notice notice;
//
//    public void changeResource_n(Notice notice){
//        this.notice = notice;
//    }
}
