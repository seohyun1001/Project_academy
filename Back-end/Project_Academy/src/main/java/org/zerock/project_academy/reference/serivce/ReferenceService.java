package org.zerock.project_academy.reference.serivce;

import org.springframework.stereotype.Service;
import org.zerock.project_academy.reference.domain.Reference;
import org.zerock.project_academy.reference.dto.ReferenceDTO;
import org.zerock.project_academy.reference.dto.ReferenceListDTO;

import java.util.List;

@Service
public interface ReferenceService {
    List<ReferenceListDTO> findAllReferences();
    ReferenceDTO addReference(ReferenceDTO referenceDTO);
    ReferenceListDTO findOneReferenceById(Long rno);
    void deleteReference(Long rno);
    Reference modifyReference(ReferenceDTO referenceDTO);
}
