package org.zerock.project_academy.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.notice.domain.Notice;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 최신 공지사항 5개를 가져오는 메서드
    List<Notice> findTop5ByOrderByRegDateDesc();
}
