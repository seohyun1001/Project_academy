import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Read = () => {
    const { mno } = useParams();
    const [member, setMember] = useState({
        mno: '',
        m_name: '',
        m_email: '',
        m_phone: '',
        m_address1: '',
        m_address2: ''
    });

    const history = useHistory();


    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/member/read/${mno}`);
                setMember(response.data);
            } catch (error) {
                console.error('회원 정보를 가져오는 중 오류가 발생했습니다.', error);
                // 오류 처리 로직 추가
            }
        };

        fetchMember();
    }, [mno]);

    const handleEditClick = () => {
        history.push(`http://localhost:8092/member/modify/${mno}`);
    };

    return (
        <div>
            <h2>강사 상세 정보</h2>
            <div>
                <label>강사 번호:</label> {member.mno}
            </div>
            <div>
                <label>이름:</label> {member.m_name}
            </div>
            <div>
                <label>이메일:</label> {member.m_email}
            </div>
            <div>
                <label>전화번호:</label> {member.m_phone}
            </div>
            <div>
                <label>주소1:</label> {member.m_address1}
            </div>
            <div>
                <label>주소2:</label> {member.m_address2}
            </div>
            <button onClick={handleEditClick}>정보수정</button>
        </div>
    );
};

export default Read;