import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDetail.css';
import RelatedClasses from '../Basic/RelatedClasses';
import Counseling from '../Basic/Counseling';

const StudentDetail = ({ student, onStudentDeleted, onEditClick }) => {
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
        if (onEditClick) {
            onEditClick();
        }
    }

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
                <div class="picture">
                    {student.s_profileImage ? (
                        <img src={student.s_profileImage} alt="Profile" width="200" height="225" />
                    ) : (
                        <img src="/student/images/basicimg.png" alt="Default Profile" width="200" height="225" />
                    )}
                </div>
                <div class="d-flex flex-column info_list">

                    <div class="input-group">
                        <label for="" class="form-label info_detail">이름</label>
                        <p>{student.s_name}</p>
                    </div>

                    <div class="input-group">
                        <label for="" class="form-label info_detail">학생번호</label>
                        <p>{student.sno}</p>
                    </div>

                    <div class="input-group">
                        <label for="" class="form-label info_detail">생년월일</label>
                        <p>{student.s_birthday}</p>
                    </div>

                    <div class="input-group">
                        <label for="" class="form-label info_detail">전화번호</label>
                        <p>{student.s_phone}</p>
                    </div>

                    <div class="input-group">
                        <label for="" class="form-label info_detail">메일</label>
                        <p>{student.s_email}</p>
                    </div>

                    <div class="input-group">
                        <label for="" class="form-label info_detail">주소1</label>
                        <p>{student.s_address1}</p>
                    </div>

                    <div class="input-group">
                        <label for="" class="form-label info_detail">주소2</label>
                        <p>{student.s_address2}</p>
                    </div>

                    <div class="input-group">
                        <label for="" class="form-label info_detail">현재 상태</label>
                        <p>{student.s_status}</p>
                    </div>
                    <div className='d-flex justify-content-end l_info_btns'>
                    <button className="btn btn-outline-primary l_info_btn" onClick={onEditClick}>수정</button>
                    <button className="btn btn-outline-danger l_info_btn" onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            </div>
            
            <RelatedClasses sno={student.sno} />
            <Counseling sno={student.sno} />
        </div>

    );
};

export default StudentDetail;