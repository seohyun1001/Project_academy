package org.zerock.project_academy.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.zerock.project_academy.student.domain.Counseling;

import java.util.List;

public interface CounselingRepository extends JpaRepository<Counseling, Long> {
    @Query("select c FROM Counseling c WHERE c.student_c.sno =:sno")
    List<Counseling> findByStudent_c_Sno(Long sno);
}
