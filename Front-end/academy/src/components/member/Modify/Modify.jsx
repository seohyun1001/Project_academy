import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Modify = ({member, onSave, onMemberDeleted}) => {
    const [updateMember, setUpdatedMember] = useState({...member});
    const [file, setFile] = useState(null);
    const navigate = useNavigate ();

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
                onMemberDeleted();
                navigate('/member'); // 삭제 후 강사 목록 페이지로 이동
            } catch (error) {
                console.error('회원 정보를 삭제하는 중 오류가 발생했습니다.', error);
            }
        }
    };

    return (
        <div>
            <h2>회원 정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input type="text" name="m_name" value={updateMember.m_name} onChange={handleChange} />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="m_email" value={updateMember.m_email} onChange={handleChange} />
                </div>
                <div>
                    <label>전화번호:</label>
                    <input type="text" name="m_phone" value={updateMember.m_phone} onChange={handleChange} />
                </div>
                <div>
                    <label>주소1:</label>
                    <input type="text" name="m_address1" value={updateMember.m_address1} onChange={handleChange} />
                </div>
                <div>
                    <label>주소2:</label>
                    <input type="text" name="m_address2" value={updateMember.m_address2} onChange={handleChange} />
                </div>
                <div>
                    <label>프로필 사진:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">저장</button>
                <button type="button" onClick={handleDelete}>삭제</button>
            </form>
        </div>
    );
};

export default Modify;