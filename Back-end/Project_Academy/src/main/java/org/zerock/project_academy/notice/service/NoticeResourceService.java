package org.zerock.project_academy.notice.service;

import org.springframework.stereotype.Service;
import org.zerock.project_academy.notice.domain.NoticeResource;
import org.zerock.project_academy.notice.dto.NoticeResourceDTO;

import java.util.List;

@Service
public interface NoticeResourceService {

    void saveAll(List<NoticeResourceDTO> resourceDtoList);
    void deleteNoticeResource(Long nno);
}
