import React, { useState } from "react";
import axios from "axios";

const LectureInfoRegister = () => {

  const [lecture, setLecture] = useState({
    lno: "",
    l_name: "",
    l_category: "",
    l_classroom: "",
    l_start: "",
    l_end: ""
  });

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
      const response = await axios.post("/lecture", lecture);
      console.log(response.data);
      alert('강의가 등록되었습니다.')
      // ************************* 상세보기로 가는 코드 추가해야 함
    } catch (error) {
      console.error("There was an error registering the lecture!", error);
      alert('알 수 없는 이유로 강의가 등록되지 않았습니다.')
    }
  };

  return (
    <div class="card profile_card">
      <form onSubmit={handleSubmit}>
      <div class="d-flex flex-wrap lecture_main_info">
        <div class="d-flex flex-column lecture_info_list">
          <div class="input-group">
            <label for="" class="form-label info_detail">강의명</label>
            <input type="text" name="l_name" value={lecture.l_name} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강의코드</label>
            <input type="text" name="lno" value={lecture.lno} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강의실</label>
            <input type="text" name="l_classroom" value={lecture.l_classroom} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">시작일</label>
            <input type="date" name="l_start" value={lecture.l_start} onChange={handleChange} />
          </div>
        </div>

        <div class="d-flex flex-column lecture_info_list">
          <div class="input-group">
            <label for="" class="form-label info_detail">담당 강사 </label>
            <input type="text" name="l_category" value={lecture.l_category} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강사 사번</label>
            <input type="text" name="mno" value={lecture.mno} onChange={handleChange} />
          </div>

          {/* <div class="input-group">
            <label for="" class="form-label info_detail">현재 인원</label>
            <input type="text" name="l_name" value={lecture.l_name} onChange={handleChange} />
          </div> */}

          <div class="input-group">
            <label for="" class="form-label info_detail">종료일</label>
            <input type="date" name="l_end" value={lecture.l_end} onChange={handleChange} />
          </div>
        </div>
      </div>
      <button type="submit">등록</button>
      </form>
    </div>

  )
}

export default LectureInfoRegister;
