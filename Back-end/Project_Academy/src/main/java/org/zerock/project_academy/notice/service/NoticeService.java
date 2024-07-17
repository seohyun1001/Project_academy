package org.zerock.project_academy.notice.service;

import org.springframework.stereotype.Service;
import org.zerock.project_academy.notice.domain.Notice;

import java.util.List;
import java.util.Optional;

@Service
public interface NoticeService {
    List<Notice> findAllNotice();
    Notice addNotice(Notice notice);
    Optional<Notice> findOneNoticeById(Long nno);
}
