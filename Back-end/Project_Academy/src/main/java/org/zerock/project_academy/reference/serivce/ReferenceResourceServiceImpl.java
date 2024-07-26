package org.zerock.project_academy.reference.serivce;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.notice.domain.NoticeResource;
import org.zerock.project_academy.reference.domain.ReferenceResource;
import org.zerock.project_academy.reference.dto.ReferenceResourceDTO;
import org.zerock.project_academy.reference.repository.ReferenceResourceRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ReferenceResourceServiceImpl implements ReferenceResourceService {
    private final ReferenceResourceRepository referenceResourceRepository;
    private final ModelMapper modelMapper;

    @Override
    public void saveAll(List<ReferenceResourceDTO> resourceDTOList) {
        List<ReferenceResource> referenceResourceList =
                resourceDTOList.stream().map(
                        dto -> modelMapper.map(dto, ReferenceResource.class)
                ).collect(Collectors.toList());
        referenceResourceRepository.saveAll(referenceResourceList);
    }

    @Override
    public void deleteReferenceResource(Long rrno) {
        referenceResourceRepository.deleteById(rrno);
    }
}
