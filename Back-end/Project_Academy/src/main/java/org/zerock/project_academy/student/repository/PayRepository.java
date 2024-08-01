package org.zerock.project_academy.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.zerock.project_academy.student.domain.Pay;

import java.util.List;

public interface PayRepository extends JpaRepository<Pay, Long> {
    @Query("select p FROM Pay p WHERE p.student_p.sno =:sno")
    List<Pay> findByStudent_p_Sno(Long sno);

    @Query("select p From Pay p Where p.lecture_p.lno =:lno")
    List<Pay> findByLecture_p_Lno(String lno);
}
