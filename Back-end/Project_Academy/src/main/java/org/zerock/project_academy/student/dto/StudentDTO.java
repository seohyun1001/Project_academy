package org.zerock.project_academy.student.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {

    private Long sno;

    private String s_name;
    private LocalDate s_birthday;
    private String s_phone;
    private String s_address1;
    private String s_address2;
    private String s_email;
    private String s_status;
    private LocalDateTime regdate;
    private LocalDateTime moddate;

}
