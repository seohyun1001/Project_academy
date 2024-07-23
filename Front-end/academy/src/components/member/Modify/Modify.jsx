import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

const Modify = () => {
    const { mno } = useParams();
    const [member, setMember] = useState({
        m_name: '',
        m_email: '',
        m_phone: '',
        m_address1: '',
        m_address2: ''
    });
    const navigate = useNavigate ();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/member/read/${mno}`);
                setMember(response.data);
            } catch (error) {
                console.error('회원 정보를 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchMember();
    }, [mno]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8092/member/modify/${mno}`, member);
            navigate(`/read/${mno}`);
        } catch (error) {
            console.error('회원 정보를 업데이트하는 중 오류가 발생했습니다.', error);
        }
    };

    return (
        <div>
            <h2>회원 정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input type="text" name="m_name" value={member.m_name} onChange={handleChange} />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="m_email" value={member.m_email} onChange={handleChange} />
                </div>
                <div>
                    <label>전화번호:</label>
                    <input type="text" name="m_phone" value={member.m_phone} onChange={handleChange} />
                </div>
                <div>
                    <label>주소1:</label>
                    <input type="text" name="m_address1" value={member.m_address1} onChange={handleChange} />
                </div>
                <div>
                    <label>주소2:</label>
                    <input type="text" name="m_address2" value={member.m_address2} onChange={handleChange} />
                </div>
                <button type="submit">저장</button>
            </form>
        </div>
    );
};

export default Modify;