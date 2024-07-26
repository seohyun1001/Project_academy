import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Basic/Header';
import SideBar from './components/Basic/SideBar';
import MainInfo from './components/Basic/MainInfo';
import RelatedClasses from './components/Basic/RelatedClasses';
import Counseling from './components/Basic/Counseling';
import Footer from './components/Basic/Footer';
import List from './components/member/List/List';
import Register from './components/member/memberRegister/MemberRegister';
import Login from './components/member/memberLogin/MemberLogin';
import StudentList from './components/student/StudentList';
import StudentRegister from './components/student/StudentRegister';
import StudentEdit from './components/student/StudentEdit';
import Noticelist from './components/notice/NoticeList';
import NoticeRegister from './components/notice/NoticeRegister';
import CounselingRegister from './components/counseling/counselingRegister/CounselingRegister';
import Basic from './components/Basic/Basic';
import Member from './components/member/Member';
import NoticeBasic from './components/Basic/NoticeBasic';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/basic' element={<Basic />}/>
                <Route path="/member" element={<Member />} />
                <Route path="/Member/Register" element={<Register />} />
                <Route path="/Member/Login" element={<Login />} />
                <Route path='/noticeBasic' element={<NoticeBasic />}/>

                <Route path="/read/:mno" element={<Read />} />
                <Route path="/modify/:mno" element={<Modify />} />
                <Route path="/list" element={<List />} />
                <Route path="/MemberRegister" element={<Register />} />
                <Route path="/MemberLogin" element={<Login />} />
                <Route path="/student" element={<StudentList />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/student/edit/:sno" element={<StudentEdit />} />
                <Route path="/Noticelist" element={<Noticelist/>}/>
                <Route path="/NoticeRegister" element={<NoticeRegister/>}/>
                <Route path="/counseling/register" element={<CounselingRegister />} />

                {/* 다른 라우트들도 추가할 수 있습니다 */}
                
            </Routes>
        </Router>
    );
};

export default App;
