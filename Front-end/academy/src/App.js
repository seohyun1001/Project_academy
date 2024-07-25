import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/member/Register/Register';
import Login from './components/member/Login/Login'; // Login 컴포넌트를 불러옵니다
import Header from './components/Basic/Header';
import SideBar from './components/Basic/SideBar';
import MainInfo from './components/Basic/MainInfo';
import RelatedClasses from './components/Basic/RelatedClasses';
import Counseling from './components/Basic/Counseling';
import Footer from './components/Basic/Footer';

const App = () => {
    return (
        <Router>
            <body class="vsc-initialized">
                <Header />
                <div class="container">
                <div class="d-flex flex-wrap">
                <SideBar />
                <div class="col">
                    <MainInfo />
                    <RelatedClasses />
                    <Counseling />
                </div>
                </div>
                </div>
                <Footer />
            </body>

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* 다른 라우트들도 추가할 수 있습니다 */}

            </Routes>
        </Router>
    );
};

export default App;
