import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Read from './components/member/Read/Read';
import Modify from './components/member/Modify/Modify';
import List from './components/member/List/List';
import Register from './components/member/memberRegister/MemberRegister';
import Login from './components/member/memberLogin/MemberLogin';
import StudentList from './components/student/StudentList';
import StudentRegister from './components/student/StudentRegister';
import Header from './components/Header';


const App = () => {
    return (
        <Router>
            {/* <Header /> */}
            <Routes>

                <Route path="/read/:mno" element={<Read />} />
                <Route path="/modify/:mno" element={<Modify />} />
                <Route path="/member" element={<List />} />
                <Route path="/MemberRegister" element={<Register />} />
                <Route path="/MemberLogin" element={<Login />} />
                <Route path="/student" element={<StudentList />} />
                <Route path="/student/register" element={<StudentRegister />} />
                {/* 다른 라우트들도 추가할 수 있습니다 */}
            </Routes>
        </Router>
    );
};

export default App;
