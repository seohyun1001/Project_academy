package org.zerock.project_academy.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.project_academy.student.domain.Student;

public interface StudentRepository  extends JpaRepository<Student, Long> {


}
