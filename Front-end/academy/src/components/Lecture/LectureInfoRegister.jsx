import React, { useState, useEffect } from "react";
import axios from "axios";

const LectureInfoRegister = ({ onRegisterComplete, setShowRegister }) => {

  const [lecture, setLecture] = useState({
    lno: "",
    l_name: "",
    l_category: "",
    l_classroom: "",
    l_start: "",
    l_end: "",
    mno: ""
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/member/list');
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
        alert("Failed to fetch members.");
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecture({
      ...lecture,
      [name]: value
    });
  };

  const handleMemberChange = (e) => {
    const memberId = e.target.value;
    setLecture({
      ...lecture,
      mno: memberId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/lecture", {
        lno: lecture.lno,
        l_name: lecture.l_name,
        l_category: lecture.l_category,
        l_classroom: lecture.l_classroom,
        l_start: lecture.l_start,
        l_end: lecture.l_end,
        mno: lecture.mno
      });
      console.log(response.data);
      alert('강의가 등록되었습니다.')
      onRegisterComplete();
      setShowRegister(false);

    } catch (error) {
      console.error("There was an error registering the lecture!", error);
      alert('알 수 없는 이유로 강의가 등록되지 않았습니다.')
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/lecture/${lecture.lno}`);
      console.log(response.data);
      alert('강의가 삭제되었습니다.');
      onRegisterComplete();
      setShowRegister(false);
    } catch (error) {
      console.error("There was an error deleting the lecture!", error);
      alert('알 수 없는 이유로 강의가 삭제되지 않았습니다.')
    }
  };

  return (
    <form onSubmit={handleSubmit} class="card profile_card">
      <div class="d-flex flex-wrap lecture_main_info">
        <div class="d-flex flex-column lecture_info_list">
          <div class="input-group">
            <label for="" class="form-label info_detail">강의명</label>
            <input type="text" class="form-control" name="l_name" value={lecture.l_name} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강의코드</label>
            <input type="text" class="form-control" name="lno" value={lecture.lno} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강의실</label>
            <input type="text" class="form-control" name="l_classroom" value={lecture.l_classroom} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">시작일</label>
            <input type="date" class="form-control" name="l_start" value={lecture.l_start} onChange={handleChange} />
          </div>
        </div>

        <div class="d-flex flex-column lecture_info_list">
          <div class="input-group">
            <label for="" class="form-label info_detail">강의 분류</label>
            <input type="text" class="form-control" name="l_category" value={lecture.l_category} onChange={handleChange} />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">강사 사번</label>
            <select name="mno" class="form-control" value={lecture.mno} onChange={handleMemberChange}>
              <option value="">Select Instructor</option>
              {members.map((member) => (
                <option key={member.mno} value={member.mno}>
                  {member.mno} - {member.m_name}
                </option>
              ))}
            </select>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">담당 강사</label>
            <input type="text" class="form-control" name="mno" value={lecture.mno} onChange={handleChange} readonly />
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">종료일</label>
            <input type="date" class="form-control" name="l_end" value={lecture.l_end} onChange={handleChange} />
          </div>

        </div>
        <div class="container">
            <button class="btn btn-outline-primary" type="submit">등록하기</button>
        </div>

      </div>
    </form>

  )
}

export default LectureInfoRegister;