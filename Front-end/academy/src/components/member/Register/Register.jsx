import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [member, setMember] = useState({
        mno: '',
        m_name: '',
        m_password: '',
        m_email: '',
        m_phone: '',
        m_address1: '',
        m_address2: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/member/register', member);
            if (response.status === 201) {
                alert('회원 등록이 성공적으로 완료되었습니다.');
                navigate('/'); // 회원 등록 후 홈 페이지로 이동
            }
        } catch (error) {
            console.error('회원 등록 중 오류가 발생했습니다.', error);
            alert('회원 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>회원 등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>회원 번호:</label>
                    <input
                        type="text"
                        name="mno"
                        value={member.mno}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>이름:</label>
                    <input
                        type="text"
                        name="m_name"
                        value={member.m_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        name="m_password"
                        value={member.m_password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>이메일:</label>
                    <input
                        type="email"
                        name="m_email"
                        value={member.m_email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>전화번호:</label>
                    <input
                        type="text"
                        name="m_phone"
                        value={member.m_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>주소1:</label>
                    <input
                        type="text"
                        name="m_address1"
                        value={member.m_address1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>주소2:</label>
                    <input
                        type="text"
                        name="m_address2"
                        value={member.m_address2}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default Register;
