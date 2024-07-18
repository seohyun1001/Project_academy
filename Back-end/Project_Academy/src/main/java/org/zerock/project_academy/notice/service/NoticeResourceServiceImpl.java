package org.zerock.project_academy.notice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.notice.domain.Notice;
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

    @Override
    public void saveAll(List<NoticeResourceDTO> resourceDtoList) {
        noticeResourceRepository.saveAll(resourceDtoList);

    }
}
