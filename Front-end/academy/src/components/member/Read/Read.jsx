import React, { useState, useEffect  } from 'react';


const Read = ({member, onEditClick, onMenberDeleted}) => {
    

    
    return (
        <div class="card profile_card">
            <div class="d-flex flex-wrap main_info">
            {member.m_picture && (
                <div>
                    <img 
                    class="img-thumbnail picture float-start" 
                    src={`${member.m_picture}`} alt="프로필 사진" />
                </div>
            )}
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
            <button onClick={onEditClick}>정보수정</button>
        </div>
    );
}

export default Read;