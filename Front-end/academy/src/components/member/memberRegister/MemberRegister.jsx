import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './MemberRegister.css'; // CSS 파일 추가

const MemberRegister = () => {
    const [member, setMember] = useState({
        mno: '',
        m_name: '',
        m_password: '',
        m_passwordConfirm: '', // 비밀번호 확인 필드 추가
        m_email: '',
        m_phone: '',
        m_address1: '',
        m_address2: ''
    });

    const [availableMno, setAvailableMno] = useState(null); // 중복 검사 결과 상태
    const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 상태
    const navigate = useNavigate();

    useEffect(() => {
        // 비밀번호와 비밀번호 확인 필드가 변경될 때마다 비밀번호 일치 상태를 업데이트
        setPasswordMatch(member.m_password === member.m_passwordConfirm);
    }, [member.m_password, member.m_passwordConfirm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    const handleUsernameCheck = async () => {
        if (!member.mno) {
            alert('회원 번호를 입력하세요.');
            return;
        }

        try {
            const response = await axios.post('/member/check-username', { mno: member.mno });
            if (response.data.available) {
                setAvailableMno(true);
                alert('사용 가능한 회원 번호입니다.');
            } else {
                setAvailableMno(false);
                alert('이미 사용 중인 회원 번호입니다.');
            }
        } catch (error) {
            console.error('회원 번호 중복 검사 중 오류가 발생했습니다.', error);
            alert('회원 번호 중복 검사 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (availableMno === false) {
            alert('이미 사용 중인 회원 번호입니다. 다른 번호를 입력하세요.');
            return;
        }
        try {
            const response = await axios.post('/member/register', member);
            if (response.status === 201) {
                alert('회원 등록이 성공적으로 완료되었습니다.');
                navigate('/'); // 회원 등록 후 홈 페이지로 이동
            }
        } catch (error) {
            console.error('회원 등록 중 오류가 발생했습니다.', error);
            alert('회원 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>회원 등록</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>회원 번호:</label>
                        <div className="input-with-button">
                            <input
                                type="text"
                                name="mno"
                                value={member.mno}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={handleUsernameCheck}>중복 검사</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>이름:</label>
                        <input
                            type="text"
                            name="m_name"
                            value={member.m_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>비밀번호:</label>
                        <input
                            type="password"
                            name="m_password"
                            value={member.m_password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>비밀번호 확인:</label>
                        <input
                            type="password"
                            name="m_passwordConfirm"
                            value={member.m_passwordConfirm}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {!passwordMatch && <p className="error">비밀번호가 일치하지 않습니다.</p>}
                    <div className="form-group">
                        <label>이메일:</label>
                        <input
                            type="email"
                            name="m_email"
                            value={member.m_email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>전화번호:</label>
                        <input
                            type="text"
                            name="m_phone"
                            value={member.m_phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>주소1:</label>
                        <input
                            type="text"
                            name="m_address1"
                            value={member.m_address1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>주소2:</label>
                        <input
                            type="text"
                            name="m_address2"
                            value={member.m_address2}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">등록</button>
                </form>
            </div>
        </div>
    );
};

export default MemberRegister;
