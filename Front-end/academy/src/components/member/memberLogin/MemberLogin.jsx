// src/components/member/memberLogin/MemberLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MemberLogin = () => {
    const [loginRequest, setLoginRequest] = useState({
        username: '',
        password: '',
        rememberMe: false
    });

    const { login } = useAuth();
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
        await login(loginRequest.username, loginRequest.password, loginRequest.rememberMe);
        navigate('/basic'); // 로그인 후 홈 페이지로 이동
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Welcome!</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={loginRequest.username}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={loginRequest.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={loginRequest.rememberMe}
                            onChange={handleChange}
                        />
                        <label>자동 로그인</label>
                    </div>
                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default MemberLogin;
