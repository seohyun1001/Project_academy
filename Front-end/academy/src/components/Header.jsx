import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import LectureList from './Lecture/LectureList';
import Member from './member/Member';

const Header = () => {
    const { user, logout } = useAuth();
    const [showLectureList, setShowLectureList] = useState(false);
    const [showMember, setShowMember] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/member/login');
    };

    const toggleLectureList = () => { // Added function to toggle the LectureList visibility
        setShowLectureList(prevState => {
            const newState = !prevState;
            if (newState) setShowMember(false); // Hide Member when LectureList is shown
            return newState;
        });
    };
    const toggleMember = () => {
        setShowMember(prevState => {
            const newState = !prevState;
            if (newState) setShowLectureList(false); // Hide LectureList when Member is shown
            return newState;
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { username, m_name } = JSON.parse(storedUser);
            // 필요 시 상태를 업데이트하는 함수를 호출할 수 있음
        }
    }, []);

    return (
        <div>
            <div className="p-3 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className="nav-link px-2 text-white home_link">Home</a></li>
                        </ul>
                        <div className="text-end">
                            {user ? (
                                <>
                                    <span className="text-white me-2">Hello, {user.m_name}</span>
                                    <button type="button" className="btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <></>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div class="container con_menubar">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li class="nav-item">
                            <Link class="nav-link active nav_link" aria-current="page" to="/student">학생</Link>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link active nav_link" aria-current="page" onClick={toggleMember}>강사</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active nav_link" aria-current="page" onClick={toggleLectureList}>강의</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active nav_link" aria-current="page" href="#">공지사항</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active nav_link nav_link_last" aria-current="page" href="#">자료실</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div class="container">
                <div class="d-flex flex-wrap">
                    {showMember && <Member />}
                    {showLectureList && <LectureList />}
                </div>
            </div>
        </div>
    );
};

export default Header;
