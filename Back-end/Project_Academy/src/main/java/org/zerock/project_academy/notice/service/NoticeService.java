package org.zerock.project_academy.notice.service;

import org.springframework.stereotype.Service;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.dto.NoticeDTO;
import org.zerock.project_academy.notice.dto.NoticeListDTO;

import java.util.List;
import java.util.Optional;

@Service
public interface NoticeService {
    List<NoticeListDTO> findAllNotice();
    NoticeDTO addNotice(NoticeDTO noticeDTO);
    NoticeListDTO findOneNoticeById(Long nno);
    void deleteNotice(Long nno);
    Notice modifyNotice(NoticeDTO noticeDTO);
}
