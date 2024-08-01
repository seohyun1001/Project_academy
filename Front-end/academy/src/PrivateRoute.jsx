import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            const mno = localStorage.getItem('mno');
            const m_name = localStorage.getItem('m_name');
            const token = localStorage.getItem('accessToken');
            console.log('PrivateRoute - localStorage mno:', mno);
            console.log('PrivateRoute - localStorage m_name:', m_name);
            console.log('PrivateRoute - localStorage token:', token);
            if (mno && m_name && token) {
                setIsAuthenticated(true);
            }
            setLoading(false);
        }
    }, [user]);

    console.log('PrivateRoute - isAuthenticated:', isAuthenticated);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        console.log('PrivateRoute - User not authenticated, redirecting to login');
        return <Navigate to="/member/login" replace />;
    }

    return children;
};

export default PrivateRoute;
