package org.zerock.project_academy.lecture.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Lecture extends BaseEntity {
    @Id
    private String lno;

    private String l_name;
    private String l_category;
    private String l_classroom;
    private Long mno;

}
