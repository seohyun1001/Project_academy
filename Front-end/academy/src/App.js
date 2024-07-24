import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/member/memberRegister/MemberRegister';
import Login from './components/member/memberLogin/MemberLogin'; // Login 컴포넌트를 불러옵니다
import Header from './components/Header';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/memberRegister" element={<Register />} />
                <Route path="/memberLogin" element={<Login />} />
                {/* <Route path="/student" element={<StudentList />} /> */}
                {/* 다른 라우트들도 추가할 수 있습니다 */}
            </Routes>
        </Router>
    );
};

export default App;
