import React, { useState, useEffect } from "react";
import axios from "axios";

const LectureInfoRegister = ({onRegisterComplete, setShowRegister }) => {

  const [lecture, setLecture] = useState({
    lno: "",
    l_name: "",
    l_category: "",
    l_classroom: "",
    l_start: "",
    l_end: "",
    mno:""
  });

  const [members, setMembers] = useState([]); // 강사 목록 상태 추가

  useEffect(() => {
    const fetchMembers = async () => { // 강사 목록 불러오기 함수
      try {
        const response = await axios.get('/member/list');
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
        alert("Failed to fetch members.");
      }
    };

    fetchMembers(); // 컴포넌트가 마운트될 때 강사 목록 불러오기
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecture({
      ...lecture,
      [name]: value
    });
  };

  const handleMemberChange = (e) => { // 강사 사번 변경 핸들러
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
            <label for="" class="form-label info_detail">강의 분류</label>
            <input type="text" name="l_category" value={lecture.l_category} onChange={handleChange} />
          </div>

          <div class="input-group">
              <label for="" class="form-label info_detail">강사 사번</label>
              <select name="mno" value={lecture.mno} onChange={handleMemberChange}>
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
            <p type="text" name="mno" value={lecture.mno} onChange={handleChange}></p>
          </div>

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
