package org.zerock.project_academy.notice.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.dto.NoticeResourceDTO;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface NoticeService {
    List<Notice> findAllNotice();
    Notice addNotice(Notice notice,List<NoticeResourceDTO> resourceDtoList);
    Optional<Notice> findOneNoticeById(Long nno);
}
