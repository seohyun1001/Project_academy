import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Modify = ({member, onSave, onMemberDeleted}) => {
    const [updateMember, setUpdatedMember] = useState({...member});
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate ();

    // 파일 변경 시 미리보기 설정
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('m_name',updateMember.m_name);
        formData.append('m_email',updateMember.m_email);
        formData.append('m_phone',updateMember.m_phone);
        formData.append('m_address1',updateMember.m_address1);
        formData.append('m_address2',updateMember.m_address2);
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.put(`http://localhost:8092/member/modify/${updateMember.mno}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onSave(); // 수정 완료 후 콜백 호출
        } catch (error) {
            console.error('회원 정보를 업데이트하는 중 오류가 발생했습니다.', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8092/member/delete/${updateMember.mno}`);
                onMemberDeleted(); // 삭제 후 콜백 호출
                navigate('/member'); // 삭제 후 강사 목록 페이지로 이동
            } catch (error) {
                console.error('회원 정보를 삭제하는 중 오류가 발생했습니다.', error);
            }
        }
    };

    const handleCancel = () => {
        onSave(); // 수정 모드 해제
    };

    return (
        <div class="card profile_card">
        <div class="d-flex flex-wrap main_info">
            <form onSubmit={handleSubmit}>
                <div>
                        <label>프로필 사진:</label>
                        <input type="file" onChange={handleFileChange} />
                        {/* 미리보기 이미지 */}
                        {preview && (
                            <img className="img-thumbnail picture float-start" src={preview} alt="미리보기" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        )}
                    </div>
                <div class="d-flex flex-column info_list">
                <div class="input-group">
                    <label for="" class="form-label info_detail">이름</label>
                    <input type="text" name="m_name" value={updateMember.m_name} onChange={handleChange} />
                </div>
                <div class="input-group">
                    <label for="" class="form-label info_detail">이메일</label>
                    <input type="email" name="m_email" value={updateMember.m_email} onChange={handleChange} />
                </div>
                <div class="input-group">
                    <label for="" class="form-label info_detail">전화번호</label>
                    <input type="text" name="m_phone" value={updateMember.m_phone} onChange={handleChange} />
                </div>
                <div class="input-group">
                    <label for="" class="form-label info_detail">주소1</label>
                    <input type="text" name="m_address1" value={updateMember.m_address1} onChange={handleChange} />
                </div>
                <div class="input-group">
                    <label for="" class="form-label info_detail">주소2</label>
                    <input type="text" name="m_address2" value={updateMember.m_address2} onChange={handleChange} />
                </div>
                </div>
                <button type="button" onClick={handleCancel}>취소</button>
                <button type="submit">저장</button>
                <button type="button" onClick={handleDelete}>삭제</button>
            </form>
        </div>
        </div>
    );
};

export default Modify;