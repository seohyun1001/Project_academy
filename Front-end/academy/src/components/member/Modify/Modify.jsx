import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Modify = ({ member, onSave, onMemberDeleted }) => {
    const [updateMember, setUpdatedMember] = useState({ ...member });
    const [file, setFile] = useState(null);
    const defaultImage = '/profile_pictures/basicimg.png';
    const [preview, setPreview] = useState(updateMember.m_picture || null);
    const fileInputRef = useRef(null);


    // 파일 변경 시 미리보기 설정
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(updateMember.m_picture || defaultImage);
        }
    }, [file, updateMember.m_picture]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('m_name', updateMember.m_name);
        formData.append('m_email', updateMember.m_email);
        formData.append('m_phone', updateMember.m_phone);
        formData.append('m_address1', updateMember.m_address1);
        formData.append('m_address2', updateMember.m_address2);
        formData.append('m_picture', updateMember.m_picture);

        if (file) {
            formData.append('file', file);
        }

        // 폼 데이터 디버깅 출력
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            const response = await axios.put(`http://localhost:8092/member/modify/${updateMember.mno}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('응답:', response);
            onSave(); // 수정 완료 후 콜백 호출
        } catch (error) {
            console.error('강사 정보를 업데이트하는 중 오류가 발생했습니다.', error);
        }
    };



    const handleCancel = () => {
        onSave(); // 수정 모드 해제
    };

    return (
        <div className="card profile_card">
            <div className="d-flex flex-wrap main_info">
                <form onSubmit={handleSubmit}>
                    {/* 프로필 사진을 첨부할 빈 공간 */}
                    <div onClick={handleFileClick}>
                        <img
                            className="img-thumbnail picture float-start"
                            src={preview}
                            alt="미리보기"
                        />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // 파일 입력 버튼 숨기기
                    />
                    <div className="d-flex flex-column info_list">
                        <div className="input-group">
                            <label className="form-label info_detail">이름</label>
                            <input type="text" name="m_name" value={updateMember.m_name} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label className="form-label info_detail">이메일</label>
                            <input type="email" name="m_email" value={updateMember.m_email} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label className="form-label info_detail">전화번호</label>
                            <input type="text" name="m_phone" value={updateMember.m_phone} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label className="form-label info_detail">주소1</label>
                            <input type="text" name="m_address1" value={updateMember.m_address1} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label className="form-label info_detail">주소2</label>
                            <input type="text" name="m_address2" value={updateMember.m_address2} onChange={handleChange} />

                        </div>

                        <button type="submit" class="btn btn-primary">저장</button>
                        <button type="button" class="btn btn-secondary" onClick={handleCancel}>취소</button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modify;
