import React, { useState, useEffect } from "react";
import axios from "axios";

const LectureInfo = ({ lectureId }) => {

  const [lecture, setLecture] = useState({
    lno: "",
    l_name: "",
    l_category: "",
    l_classroom: "",
    l_start: "",
    l_end: "",
    mno: ""
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

  if (!lectureId) {
    return null;
  }

  return (
    <div class="card profile_card">
      <div class="d-flex flex-wrap lecture_main_info">

        <div class="d-flex flex-column lecture_info_list">
          <div class="input-group">
            <label for="" class="form-label info_detail">강의명</label>
            <p>{lecture.l_name}</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강의코드</label>
            <p>{lecture.lno}</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강의실</label>
            <p>{lecture.l_classroom}</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">시작일</label>
            <p>{lecture.l_start}</p>
          </div>
        </div>

        <div class="d-flex flex-column lecture_info_list">
          <div class="input-group">
            <label for="" class="form-label info_detail">담당 강사 </label>
            <p>{lecture.mno}</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강사 사번</label>
            <p>{lecture.mno}</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">분류</label>
            <p>{lecture.l_category}</p>
          </div>


          <div class="input-group">
            <label for="" class="form-label info_detail">종료일</label>
            <p>{lecture.l_end}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LectureInfo;
