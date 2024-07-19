import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberLogin = () => {
    const [loginRequest, setLoginRequest] = useState({
        username: '',
        password: '',
        rememberMe: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginRequest({
            ...loginRequest,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', loginRequest,  { withCredentials: true });
            const { accessToken, mno, m_name } = response.data;

            // JWT 토큰과 사용자 정보를 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('username', mno);
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
                        name="username"
                        value={loginRequest.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        name="password"
                        value={loginRequest.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={loginRequest.rememberMe}
                            onChange={handleChange}
                        />
                        자동 로그인
                    </label>
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default MemberLogin;
