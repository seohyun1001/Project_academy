import React, { useState } from 'react';
import axios from 'axios';


const Read = ({member, onEditClick, onMemberDeleted}) => {
    const [updateMember, setUpdatedMember] = useState({ ...member });
    const defaultImage = '/profile_pictures/basicimg.png'; // 기본 이미지 경로 설정
    
    const handleDelete = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8092/member/delete/${updateMember.mno}`);
                onMemberDeleted(); // 삭제 후 콜백 호출
            } catch (error) {
                console.error('강사 정보를 삭제하는 중 오류가 발생했습니다.', error);
            }
        }
    };
    const getProfileImage = () => {
        return updateMember.m_picture ? updateMember.m_picture : defaultImage;
    };
    
    return (
        <div class="card profile_card">
            <div class="d-flex flex-wrap main_info">
                <div>
                        <img 
                        class="img-thumbnail picture float-start" 
                        src={getProfileImage()} alt="프로필 사진" />
                </div>
            <div class="d-flex flex-column info_list">
            <div class="input-group">
                <label for="" class="form-label info_detail">이름</label>
                <p>{member.m_name}</p>
            </div>
            <div class="input-group">
                <label for="" class="form-label info_detail">강사 번호</label>
                <p>{member.mno}</p>
            </div>
            <div class="input-group">
                <label for="" class="form-label info_detail">이메일</label> 
                <p>{member.m_email}</p>
            </div>
            <div class="input-group">
                <label for="" class="form-label info_detail">전화번호</label> 
                <p>{member.m_phone}</p>
            </div>
            <div class="input-group">
                <label for="" class="form-label info_detail">주소1</label> 
                <p>{member.m_address1}</p>
            </div>
            <div class="input-group">
                <label for="" class="form-label info_detail">주소2</label> 
                <p>{member.m_address2}</p>
            </div>
            </div>
            </div>
            <div>
            <button type="button" class="btn btn-primary" onClick={onEditClick}>수정</button>
            <button type="button" class="btn btn-danger" onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
}

export default Read;