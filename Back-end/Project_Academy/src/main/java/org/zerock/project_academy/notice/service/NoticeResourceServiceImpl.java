package org.zerock.project_academy.notice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.notice.domain.NoticeResource;
import org.zerock.project_academy.notice.dto.NoticeResourceDTO;
import org.zerock.project_academy.notice.repository.NoticeResourceRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class NoticeResourceServiceImpl implements NoticeResourceService {
    private final NoticeResourceRepository noticeResourceRepository;
    private final ModelMapper modelMapper;

    @Override
    public void saveAll(List<NoticeResourceDTO> resourceDtoList) {
        List<NoticeResource> resourceList =
                resourceDtoList.stream().map(
                        dto -> modelMapper.map(dto, NoticeResource.class)
                ).collect(Collectors.toList());
        noticeResourceRepository.saveAll(resourceList);
    }

    @Override
    public void deleteNoticeResource(Long nrno) {
        noticeResourceRepository.deleteById(nrno);
    }

    @Override
    public int getMaxOrd(Long nno) {
        return noticeResourceRepository.getMaxOrd(nno);
    }
}
