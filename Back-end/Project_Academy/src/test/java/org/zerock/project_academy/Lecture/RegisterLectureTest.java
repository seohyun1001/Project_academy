package org.zerock.project_academy.Lecture;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.project_academy.lecture.domain.Lecture;
import org.zerock.project_academy.lecture.dto.LectureDTO;
import org.zerock.project_academy.lecture.repository.LectureRepository;
import org.zerock.project_academy.lecture.service.LectureService;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class RegisterLectureTest {

    @Autowired
    private LectureService lectureService; // LectureService 빈 주입

    @Autowired
    private LectureRepository lectureRepository; // LectureRepository 빈 주입

    @Test
    public void testRegisterLecture() {
        // 테스트에 사용할 LectureDTO 생성
        LectureDTO lectureDTO = LectureDTO.builder()
                .lno("L002")
                .l_name("JAVA")
                .l_category("Programming")
                .l_classroom("Room 102")
                .build();

        // LectureDTO를 Lecture 엔티티로 변환
        Lecture lecture = Lecture.builder()
                .lno(lectureDTO.getLno())
                .l_name(lectureDTO.getL_name())
                .l_category(lectureDTO.getL_category())
                .l_classroom(lectureDTO.getL_classroom())
                .build();

        // 강의 등록 서비스 호출
        lectureService.registerLecture(lecture);

        // 강의 등록 결과 검증
        Lecture savedLecture = lectureRepository.findById(lectureDTO.getLno()).orElse(null);
        assertThat(savedLecture).isNotNull(); // 강의가 저장되었는지 확인
        assertThat(savedLecture.getL_name()).isEqualTo(lectureDTO.getL_name()); // 강의명이 일치하는지 확인
        assertThat(savedLecture.getL_category()).isEqualTo(lectureDTO.getL_category()); // 카테고리가 일치하는지 확인
        assertThat(savedLecture.getL_classroom()).isEqualTo(lectureDTO.getL_classroom()); // 강의실이 일치하는지 확인
    }
}
