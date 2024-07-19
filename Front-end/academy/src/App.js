import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberRegister from './components/member/memberRegister/MemberRegister';
import MemberLogin from './components/member/memberLogin/MemberLogin';// Login 컴포넌트를 불러옵니다

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/MemberRegister" element={<MemberRegister/>} />
                <Route path="/MemberLogin" element={<MemberLogin />} />
                {/* 다른 라우트들도 추가할 수 있습니다 */}
            </Routes>
        </Router>
    );
};

export default App;
