package org.zerock.project_academy.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.notice.domain.NoticeResource;

public interface NoticeResourceRepository extends JpaRepository<NoticeResource, Long> {
}
