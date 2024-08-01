package org.zerock.project_academy.reference.serivce;

import org.springframework.stereotype.Service;
import org.zerock.project_academy.reference.dto.ReferenceResourceDTO;

import java.util.List;

@Service
public interface ReferenceResourceService {
    void saveAll(List<ReferenceResourceDTO> resourceDTOList);
    void deleteReferenceResource(Long rrno);


}
