package org.zerock.project_academy.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.notice.domain.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
