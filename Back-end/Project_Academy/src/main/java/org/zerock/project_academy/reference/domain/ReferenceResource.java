package org.zerock.project_academy.reference.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "reference")
public class ReferenceResource implements Comparable<ReferenceResource> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rrno;

    private String rr_name;
    private String rr_path;
    private String rr_type;
    // 카톡에 올려준 create문에는 type이 int로 되어 있는데 int 맞는지
    // -> 일단 String으로 함
    private int rr_ord;

    @ManyToOne
    @JoinColumn(name = "rno", referencedColumnName = "rno")
    private Reference reference;

    @Override
    public int compareTo(ReferenceResource nrOther) {
        return this.rr_ord = nrOther.rr_ord;
    }

    public void changeResource_r(Reference reference){
        this.reference = reference;
    }
}
