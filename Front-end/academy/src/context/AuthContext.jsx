import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password, rememberMe) => {
        try {
            const response = await axios.post('/auth/login', { username, password, rememberMe });
            const { accessToken, mno, m_name } = response.data;
            setUser({ username: mno, m_name });

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify({ username: mno, m_name }));

        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout'); // 로그아웃 요청을 백엔드로 보냄
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken')
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
