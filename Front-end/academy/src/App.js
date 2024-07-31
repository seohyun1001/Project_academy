import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Basic/Header';
import Footer from './components/Basic/Footer';
import List from './components/member/List/List';
import Register from './components/member/memberRegister/MemberRegister';
import Login from './components/member/memberLogin/MemberLogin';
import StudentList from './components/student/StudentList';
import StudentRegister from './components/student/StudentRegister';
import StudentEdit from './components/student/StudentEdit';
import Noticelist from './components/notice/NoticeList';
import NoticeRegister from './components/notice/NoticeRegister';
import CounselingRegister from './components/counseling/CounselingRegister';
import CounselingList from './components/counseling/CounselingList';
import CounselingEdit from './components/counseling/CounselingEdit';
import PayRegister from './components/pay/PayRegister';
import PayList from './components/pay/PayList';
import PayEdit from './components/pay/PayEdit';
import Basic from './components/Basic/Basic';
import Member from './components/member/Member';
import NoticeBasic from './components/Basic/notice/NoticeBasic';
import Lecture from './components/Lecture/Lecture';
import NoticeDetailBasic from './components/Basic/notice/NoticeDetailBasic';

import NoticeDetail from './components/notice/NoticeDetail';
import NoticeModify from './components/notice/NoticeModify';
import LectureBasic from './components/Basic/Lecture/LectureBasic';
import RegisterModal from './components/Basic/student/registerModal';
import PrivateRoute from './PrivateRoute'; // 추가된 부분

const App = () => {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path='/basic' element={<Basic />} />
                <Route path='/noticeBasic' element={<NoticeBasic />} />
                <Route path='/noticeDetail' element={<NoticeDetailBasic />} />
                <Route path='/registerModal' element={<RegisterModal />} />

                <Route path="/Member/Register" element={<Register />} />
                <Route path="/Member/Login" element={<Login />} />
                <Route path="/member" element={<Member />} />
                
                <Route path="/student" element={<StudentList />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/student/edit/:sno" element={<StudentEdit />} />

                <Route path="/Noticelist" element={<Noticelist />} />
                <Route path="/NoticeRegister" element={<NoticeRegister />} />
                <Route path="/Notice/:nno" element={<NoticeDetail />} />
                <Route path="/Notice/modify/:nno" element={<NoticeModify/>}/>

                <Route path="/counseling/register" element={<CounselingRegister />} />
                <Route path="/counseling/list" element={<CounselingList />} />
                <Route path="/counseling/edit/:cno" element={<CounselingEdit/>} />
                <Route path="/pay/register" element={<PayRegister/>} />
                <Route path="/pay/list" element={<PayList/>} />
                <Route path="/pay/edit/:pno" element={<PayEdit/>} />

                <Route path='/lecture' element={<Lecture />}/>
                <Route path='/lectureBasic' element={<LectureBasic />}/>
                
                {/* 다른 라우트들도 추가할 수 있습니다 */}

            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;
