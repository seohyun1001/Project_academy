import React, { useState, useEffect } from "react";
import axios from "axios";

const LectureModify = ({ lectureId, setIsModifying }) => {
  const [lecture, setLecture] = useState({
    lno: "",
    l_name: "",
    l_category: "",
    l_classroom: "",
    l_start: "",
    l_end: "",
    member_l: {
      mno: "",
      m_name: ""
    }
  });

  useEffect(() => {
    if (lectureId) {
      const fetchLecture = async () => {
        try {
          const response = await axios.get(`/lecture/read`, { params: { lno: lectureId } });
          setLecture(response.data);
        } catch (error) {
          console.error("Error fetching the lecture:", error);
          window.alert("Lecture not found with id " + lectureId);
        }
      };

      fetchLecture();
    }
  }, [lectureId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecture({
      ...lecture,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const lectureDTO = {
          lno: lecture.lno,
          l_name: lecture.l_name,
          l_category: lecture.l_category,
          l_classroom: lecture.l_classroom,
          l_start: lecture.l_start,
          l_end: lecture.l_end,
          mno: lecture.member_l.mno
        };
        await axios.post(`/lecture/modify`, lectureDTO);
        window.alert("강의가 수정되었습니다.");
        setIsModifying(false);
      } catch (error) {
        console.error("Error updating the lecture:", error);
        window.alert("Failed to update lecture.");
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="card profile_card">
        <div class="d-flex flex-wrap lecture_main_info">

          <div class="d-flex flex-column lecture_info_list">
            <div class="input-group">
              <label class="form-label info_detail">강의명</label>
              <input type="text" name="l_name" value={lecture.l_name} onChange={handleChange} />
            </div>

            <div class="input-group">
              <label class="form-label info_detail">강의코드</label>
              <p>{lecture.lno}</p>
            </div>

            <div class="input-group">
              <label class="form-label info_detail">강의실</label>
              <input type="text" name="l_classroom" value={lecture.l_classroom} onChange={handleChange} />
            </div>

            <div class="input-group">
              <label class="form-label info_detail">시작일</label>
              <input type="date" name="l_start" value={lecture.l_start} onChange={handleChange} />
            </div>
          </div>

          <div class="d-flex flex-column lecture_info_list">
            <div class="input-group">
              <label class="form-label info_detail">강의 분류</label>
              <input type="text" name="l_category" value={lecture.l_category} onChange={handleChange} />
            </div>

            <div class="input-group">
              <label class="form-label info_detail">강사 사번</label>
              <p>{lecture.member_l.mno}</p>
            </div>

            <div class="input-group">
              <label class="form-label info_detail">담당 강사</label>
              <p>{lecture.member_l.m_name}</p>
            </div>

            <div class="input-group">
              <label class="form-label info_detail">종료일</label>
              <input type="date" name="l_end" value={lecture.l_end} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => setIsModifying(false)}>Cancel</button>
    </form>
  );
};

export default LectureModify;