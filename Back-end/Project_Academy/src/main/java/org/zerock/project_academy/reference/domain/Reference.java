package org.zerock.project_academy.reference.domain;

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
@ToString(exclude = {"referenceResourceSet", "member"})
@Builder
public class Reference extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rno;

    private String r_title;
    private String r_content;
    private String r_image;

    @ManyToOne
    @JoinColumn(name = "writer", referencedColumnName = "m_name")
    private Member member;

    @OneToMany(mappedBy = "reference",
            cascade = {CascadeType.ALL},
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    @Builder.Default
    @BatchSize(size = 20)
    private Set<ReferenceResource> referenceResourceSet = new HashSet<>();

//    public void addResource_r(){}

//    public void clearResource_r(){}

    // 주석 처리한 부분은 spring boot(아마도 b01)의 domain 패키지의 Board 클래스를 확인하기

}
