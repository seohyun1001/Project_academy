import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    console.log('PrivateRoute - user:', user);

    if (!user) {
        console.log('PrivateRoute - User not authenticated, redirecting to login');
        return <Navigate to="/member/login" replace />;
    }

    return children;
};

export default PrivateRoute;
