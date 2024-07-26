package org.zerock.project_academy.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.zerock.project_academy.notice.domain.NoticeResource;

public interface NoticeResourceRepository extends JpaRepository<NoticeResource, Long> {
    @Query("DELETE FROM NoticeResource n WHERE n.notice.nno = :nno")
    public void deleteByNno(Long nno);
}
