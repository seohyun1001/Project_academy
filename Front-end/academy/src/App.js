import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Register from './components/member/memberRegister/MemberRegister';
import Login from './components/member/memberLogin/MemberLogin';
import StudentList from './components/student/StudentList';
=======
import Register from './components/member/Register/Register';
import Login from './components/member/Login/Login'; // Login 컴포넌트를 불러옵니다
import Header from './components/Header';
>>>>>>> origin/ksh

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/MemberRegister" element={<Register />} />
                <Route path="/MemberLogin" element={<Login />} />
                <Route path="/student" element={<StudentList />} />
                {/* 다른 라우트들도 추가할 수 있습니다 */}
                
            </Routes>
        </Router>
    );
};

export default App;
