package org.zerock.project_academy.reference.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.zerock.project_academy.reference.domain.ReferenceResource;

@ToString
@Data
@Builder
@AllArgsConstructor
public class ReferenceResourceListDTO {
    private Long rrno;
    private String rr_name;
    private String rr_path;
    private String rr_type;
    private Long rno;
    private Long file_size;
    private int rr_ord;
    public ReferenceResourceListDTO(){};
    public ReferenceResourceListDTO(ReferenceResource rR){
        this.rrno = rR.getRrno();
        this.rr_name = rR.getRr_name();
        this.rr_path = rR.getRr_path();
        this.rr_type = rR.getRr_type();
        this.rno = rR.getRrno();
        this.rr_ord = rR.getRr_ord();

    }

}
