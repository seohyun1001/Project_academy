import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Read from './components/member/Read/Read';
import Modify from './components/member/Modify/Modify';
import List from './components/member/List/List';
import Register from './components/member/memberRegister/MemberRegister';
import Login from './components/member/memberLogin/MemberLogin';
import StudentList from './components/student/StudentList';
import StudentRegister from './components/student/StudentRegister';
import StudentEdit from './components/student/StudentEdit';
import Noticelist from './components/notice/NoticeList';
import NoticeRegister from './components/notice/NoticeRegister';
import NoticeDetail from './components/notice/NoticeDetail';
import NoticeModify from './components/notice/NoticeModify';
import Referencelist from './components/reference/ReferenceList';
import ReferenceRegister from './components/reference/ReferenceRegister';
import ReferenceDetail from './components/reference/ReferenceDetail';

const App = () => {
    return (
        <Router>
            {/* <Header /> */}
            <Routes>
                <Route path="/read/:mno" element={<Read />} />
                <Route path="/modify/:mno" element={<Modify />} />
                <Route path="/list" element={<List />} />
                <Route path="/MemberRegister" element={<Register />} />
                <Route path="/MemberLogin" element={<Login />} />
                <Route path="/student" element={<StudentList />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/student/edit/:sno" element={<StudentEdit />} />
                <Route path="/Noticelist" element={<Noticelist/>}/>
                <Route path="/ReferenceList" element={<Referencelist/>}/>
                <Route path="/NoticeRegister" element={<NoticeRegister/>}/>
                <Route path="/Reference/:rno" element={<ReferenceDetail />} />
                <Route path="/ReferenceRegister" element={<ReferenceRegister/>}/>
                <Route path="/Notice/:nno" element={<NoticeDetail />} />
                <Route path="/Notice/modify/:nno" element={<NoticeModify/>}/>
                {/* 다른 라우트들도 추가할 수 있습니다 */}
            </Routes>
        </Router>
    );
};

export default App;
