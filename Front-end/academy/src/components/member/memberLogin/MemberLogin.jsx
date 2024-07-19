import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberLogin = () => {
    const [mno, setMno] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {
                mno,
                password
            });
            const { accessToken, mno: userMno, m_name } = response.data;

            // JWT 토큰과 사용자 정보를 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('mno', userMno);
            localStorage.setItem('m_name', m_name);

            alert('로그인 성공');
            navigate('/'); // 로그인 후 홈 페이지로 이동
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다.', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>회원 번호:</label>
                    <input
                        type="text"
                        value={mno}
                        onChange={(e) => setMno(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default MemberLogin;
