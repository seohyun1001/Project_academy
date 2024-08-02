import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

import Register from './components/member/MemberRegister';
import Login from './components/member/MemberLogin';
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
import StudentDetail from './components/student/StudentDetail';
import TestRegister from './components/reference/TestRegister';
import TestModify from './components/reference/TestModify';
import LectureList from './components/Lecture/LectureList';


const Layout = () => (
    <div className='d-flex flex-column justify-content-between mainBody vsc-initialized'>
        <Header />
        <div className="container">
            <div className="d-flex flex-wrap">
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
);

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/member/login" element={<Login />} />
                    <Route element={<Layout />}>
                        <Route path="/" element={<PrivateRoute><Basic /></PrivateRoute>} />
                        <Route path="/noticeBasic" element={<PrivateRoute><NoticeBasic /></PrivateRoute>} />

                        {/* <Route path="/member/list" element={<PrivateRoute><MemberList /></PrivateRoute>} /> */}
                        {/* <Route path="/Member/Register" element={<PrivateRoute><Register /></PrivateRoute>} /> */}
                        <Route path="/member" element={<PrivateRoute><Member /></PrivateRoute>} />

                        <Route path="/student" element={<PrivateRoute><Student /></PrivateRoute>} />
                        <Route path="/student/register" element={<PrivateRoute><StudentRegister /></PrivateRoute>} />
                        <Route path="/student/edit/:sno" element={<PrivateRoute><StudentEdit /></PrivateRoute>} />

                        <Route path="/Noticelist" element={<PrivateRoute><Noticelist /></PrivateRoute>} />
                        <Route path="/NoticeRegister" element={<PrivateRoute><NoticeRegister /></PrivateRoute>} />
                        <Route path='/testlist' element={<PrivateRoute><Referencelist /></PrivateRoute>} />

                        <Route path="/ReferenceList" element={<Referencelist />} />
                        <Route path="/NoticeRegister" element={<NoticeRegister />} />
                        <Route path="/Reference/:rno" element={<ReferenceDetail />} />
                        <Route path="/ReferenceRegister" element={<ReferenceRegister />} />

                        <Route path="/counseling/register" element={<PrivateRoute><CounselingRegister /></PrivateRoute>} />
                        <Route path="/counseling/list" element={<PrivateRoute><CounselingList /></PrivateRoute>} />
                        <Route path="/counseling/edit/:cno" element={<PrivateRoute><CounselingEdit /></PrivateRoute>} />
                        <Route path="/pay/register" element={<PrivateRoute><PayRegister /></PrivateRoute>} />
                        <Route path="/pay/list" element={<PrivateRoute><PayList /></PrivateRoute>} />
                        <Route path="/pay/edit/:pno" element={<PrivateRoute><PayEdit /></PrivateRoute>} />

                        <Route path="/lecturelist" element={<PrivateRoute><LectureList /></PrivateRoute>} />
                        <Route path="/lecture" element={<PrivateRoute><Lecture /></PrivateRoute>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
