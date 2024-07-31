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
import Referencelist from './components/reference/ReferenceList';
import ReferenceRegister from './components/reference/ReferenceRegister';
import ReferenceDetail from './components/reference/ReferenceDetail';
import ReferenceModify from './components/reference/ReferenceModify';
import Testlist from './components/reference/TestList';
import LectureBasic from './components/Basic/Lecture/LectureBasic';
import RegisterModal from './components/Basic/student/registerModal';
import PrivateRoute from './PrivateRoute'; // 추가된 부분
import Student from './components/student/Student';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/basic" element={<PrivateRoute><Basic /></PrivateRoute>} />
                    <Route path="/noticeBasic" element={<PrivateRoute><NoticeBasic /></PrivateRoute>} />
                    <Route path="/member/login" element={<Login />} />
                    <Route path="/list" element={<PrivateRoute><List /></PrivateRoute>} />
                    <Route path="/read/:mno" element={<PrivateRoute><Read /></PrivateRoute>} />
                    <Route path="/Member/Register" element={<PrivateRoute><Register /></PrivateRoute>} />
                    <Route path="/modify/:mno" element={<PrivateRoute><Modify /></PrivateRoute>} />
                    <Route path="/student" element={<PrivateRoute><Student /></PrivateRoute>} />
                    <Route path="/student/register" element={<PrivateRoute><StudentRegister /></PrivateRoute>} />
                    <Route path="/student/edit/:sno" element={<PrivateRoute><StudentEdit /></PrivateRoute>} />
                    <Route path="/Noticelist" element={<PrivateRoute><Noticelist /></PrivateRoute>} />
                    <Route path="/NoticeRegister" element={<PrivateRoute><NoticeRegister /></PrivateRoute>} />
                    <Route path="/counseling/register" element={<PrivateRoute><CounselingRegister /></PrivateRoute>} />
                    <Route path="/counseling/list" element={<PrivateRoute><CounselingList /></PrivateRoute>} />
                    <Route path="/counseling/edit/:cno" element={<PrivateRoute><CounselingEdit /></PrivateRoute>} />
                    <Route path="/pay/register" element={<PrivateRoute><PayRegister /></PrivateRoute>} />
                    <Route path="/pay/list" element={<PrivateRoute><PayList /></PrivateRoute>} />
                    <Route path="/pay/edit/:pno" element={<PrivateRoute><PayEdit /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
