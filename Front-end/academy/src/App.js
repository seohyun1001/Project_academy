import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/member/memberRegister/MemberRegister';
import Login from './components/member/memberLogin/MemberLogin';
import StudentList from './components/student/StudentList';
import StudentRegister from './components/student/StudentRegister';
import CounselingRegister from './components/counseling/CounselingRegister';
import CounselingList from './components/counseling/CouncelingList';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/Member/Register" element={<Register />} />
                <Route path="/Member/Login" element={<Login />} />
                <Route path="/student" element={<StudentList />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/counseling/register" element={<CounselingRegister />} />
                <Route path="/counseling/list" element={<CounselingList />} />
                {/* 다른 라우트들도 추가할 수 있습니다 */}
            </Routes>
        </Router>
    );
};

export default App;
