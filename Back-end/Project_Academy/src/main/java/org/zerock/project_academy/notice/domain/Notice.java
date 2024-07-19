package org.zerock.project_academy.notice.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.zerock.project_academy.member.domain.Member;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"noticeResourceSet", "member"})
@Builder
public class Notice extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nno;

    private String n_title;
    private String n_content;
    private String n_image;
//    private String writer;

    @ManyToOne
    @JoinColumn(name = "writer", referencedColumnName = "mno")
    private Member writer;

    @OneToMany(mappedBy = "notice",
            cascade = {CascadeType.ALL},
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    @BatchSize(size = 20)
    @Builder.Default
    private Set<NoticeResource> noticeResourceSet = new HashSet<>();

//    public void addResource_n(){}

//    public void clearResource_n(){}

    // 주석 처리한 부분은 spring boot(아마도 b01)의 domain 패키지의 Board 클래스를 확인하기

}
