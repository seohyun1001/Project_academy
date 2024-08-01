import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (username, password, rememberMe) => {
        try {
            const response = await axios.post('/auth/login', { username, password, rememberMe });
            const { accessToken, mno, m_name, roleSet } = response.data;
            setUser({ username: mno, m_name, roleSet });

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('mno', mno);
            localStorage.setItem('m_name', m_name);
            localStorage.setItem('roleSet', JSON.stringify(roleSet));
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // 인증 헤더 설정

            console.log('로그인 성공:', { username: mno, m_name, roleSet });
        } catch (error) {
            console.error('로그인 실패:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('mno');
            localStorage.removeItem('m_name');
            localStorage.removeItem('roleSet');
            delete axios.defaults.headers.common['Authorization']; // 인증 헤더 제거
            console.log('로그아웃 성공');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    useEffect(() => {
        const mno = localStorage.getItem('mno');
        const m_name = localStorage.getItem('m_name');
        const token = localStorage.getItem('accessToken');
        const roleSet = JSON.parse(localStorage.getItem('roleSet'));
        console.log('AuthProvider - mno:', mno);
        console.log('AuthProvider - m_name:', m_name);
        console.log('AuthProvider - token:', token);
        console.log('AuthProvider - roleSet:', roleSet);

        if (mno && m_name && token && roleSet) {
            setUser({ username: mno, m_name, roleSet });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('로컬 스토리지에서 사용자 정보 설정:', { username: mno, m_name, roleSet });
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
