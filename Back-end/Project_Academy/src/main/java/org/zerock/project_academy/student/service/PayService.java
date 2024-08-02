package org.zerock.project_academy.student.service;

import org.zerock.project_academy.student.domain.Pay;
import org.zerock.project_academy.student.dto.PayDTO;

import java.util.List;

public interface PayService {

    Long register(PayDTO payDTO);

    PayDTO get(Long pno);

    void modify(PayDTO payDTO);

    void remove(Long pno);

    List<PayDTO> getAll();

    List<PayDTO> getBySno(Long sno);

    List<Pay> getByLno(String lno);
}
