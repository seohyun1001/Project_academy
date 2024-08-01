import React, { useState, useEffect } from "react";
import axios from "axios";
import LectureProfile from "./LectureProfile";
import LectureModify from "./LectureModify";

const LectureInfo = ({ lectureId, onModificationComplete }) => {

  const [lecture, setLecture] = useState({
    lno: "",
    l_name: "",
    l_category: "",
    l_classroom: "",
    l_start: "",
    l_end: "",
    memberL: {
      mno: "",
      m_name: ""
    }
  });

  const [isModifying, setIsModifying] = useState(false);

  const fetchLecture = async () => {
    if (lectureId) {
      try {
        const response = await axios.get(`/lecture/read`, { params: { lno: lectureId } });
        setLecture(response.data);
      } catch (error) {
        console.error("Error fetching the lecture:", error);
        window.alert("Lecture not found with id " + lectureId);
      }
    }
  };

  useEffect(() => {
    fetchLecture();
  }, [lectureId]);

  const handleModificationComplete = () => {
    fetchLecture();
    onModificationComplete();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`${lecture.lno} - ${lecture.l_name} 강의를 삭제하시겠습니까?`);
    if (confirmDelete) {
      try {
        await axios.delete(`/lecture/${lectureId}`);
        window.alert(`${lecture.lno} - ${lecture.l_name} 강의가 삭제되었습니다.`);
        onModificationComplete();
      } catch (error) {
        console.error("There was an error deleting the lecture!", error);
        window.alert('알 수 없는 이유로 강의가 삭제되지 않았습니다.');
      }
    }
  };

  if (!lectureId) {
    return null;
  }

  return (
    <>
      {isModifying ? (
        <LectureModify
          lectureId={lectureId}
          setIsModifying={setIsModifying}
          onModificationComplete={handleModificationComplete}
        />
      ) : (
        <>
          <div class="card profile_card">
            <div class="d-flex flex-wrap lecture_main_info">

              <div class="d-flex flex-column lecture_info_list">
                <div class="input-group">
                  <label for="" class="form-label info_detail">강의명</label>
                  <p class="">{lecture.l_name}</p>
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
                  <label for="" class="form-label info_detail">강의 분류</label>
                  <p>{lecture.l_category}</p>
                </div>

                <div class="input-group">
                  <label for="" class="form-label info_detail">강사 사번</label>
                  <p>{lecture.memberL.mno}</p>
                </div>

                <div class="input-group">
                  <label for="" class="form-label info_detail">담당 강사</label>
                  <p>{lecture.memberL.m_name}</p>
                </div>


                <div class="input-group">
                  <label for="" class="form-label info_detail">종료일</label>
                  <p>{lecture.l_end}</p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end l_info_btns">
              <div>
                <button class="btn btn-outline-primary l_info_btn" onClick={() => setIsModifying(true)}>수정하기</button>
                <button class="btn btn-outline-danger l_info_btn" onClick={handleDelete} >삭제하기</button>
              </div>
            </div>
          </div>


          <LectureProfile />
        </>
      )}
    </>
  )
}

export default LectureInfo;
