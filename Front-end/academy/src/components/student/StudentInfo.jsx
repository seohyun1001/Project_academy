import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const StudentInfo = ({ student, onStudentDeleted }) => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();



  const handleDelete = async () => {
    if (window.confirm(`${student.s_name} 학생의 정보를 삭제 하시겠습니까?`)) {
      try {
        await axios.delete(`http://localhost:8092/student/${student.sno}`);
        console.log(`${student.s_name} 학생 정보 삭제 완료`);
        alert(`${student.sno} 번 ${student.s_name} 이(가) 삭제되었습니다.`);
        onStudentDeleted();
      } catch (error) {
        console.error('학생 정보 삭제 중 오류가 발생했습니다: ', error);
        alert('학생 정보 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/student/edit/${student.sno}`);
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!profileImage) {
      alert('이미지를 선택해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', profileImage);

    try {
      await axios.post(`http://localhost:8092/student/uploadProfileImage/${student.sno}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('프로필 이미지가 성공적으로 업로드되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('프로필 이미지 업로드 중 오류가 발생했습니다.', error);
      alert('프로필 이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div class="card profile_card">
      <div class="d-flex flex-wrap main_info">
        <img class="img-thumbnail picture float-start"></img>
        <div class="d-flex flex-column info_list">
          <div class="input-group">
            <label for="" class="form-label info_detail">이름</label>
            <p type="text" name="" id="" >홍길동</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">학생번호</label>
            <p type="text" name="" id="">2407001</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">전화번호</label>
            <p type="text" name="" id="">01043218765</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">주소1</label>
            <p type="text" name="" id="">부산</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">주소2</label>
            <p type="text" name="" id="">연제구</p>
          </div>

          <div class="input-group">
            <label for="" class="form-label info_detail">현재 상태</label>
            <p type="text" name="" id="">이수중</p>
          </div>
        </div>
      </div>
    </div>
  )
};

StudentInfo.propTypes = {
  student: PropTypes.shape({
    sno: PropTypes.string,
    s_name: PropTypes.string,
    s_profileImage: PropTypes.string,
  }),
  onStudentDeleted: PropTypes.func.isRequired,
};

StudentInfo.defaultProps = {
  student: {},
};


export default StudentInfo;