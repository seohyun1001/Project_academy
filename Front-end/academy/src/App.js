import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/member/Register/Register';
import Login from './components/member/Login/Login'; // Login 컴포넌트를 불러옵니다
import Read from './components/member/Read/Read';
import Modify from './components/member/Modify/Modify';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/read/:mno" element={<Read />} />
                <Route path="/modify/:mno" element={<Modify />} />
                {/* 다른 라우트들도 추가할 수 있습니다 */}
            </Routes>
        </Router>
    );
};

export default App;
