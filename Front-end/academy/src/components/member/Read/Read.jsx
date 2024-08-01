import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Read = ({ member, onEditClick, onMemberDeleted }) => {
    const [updateMember, setUpdatedMember] = useState({ ...member });
    const defaultImage = '/profile_pictures/basicimg.png'; // 기본 이미지 경로 설정
    const [loggedInMno, setLoggedInMno] = useState(null);
    const [roleSet, setRoleSet] = useState([]);

    const [lectures, setLectures] = useState([]);

    const fetchLectures = async () => {
        if (member.mno) {
            try {
                const response = await axios.get(`http://localhost:8092/lecture/memberLectures`, { params: { mno: member.mno } });
                setLectures(response.data);
            } catch (error) {
                console.error("Error fetching the lectures:", error);
                window.alert("Lectures not found for member with id " + member.mno);
            }
        }
    };



    useEffect(() => {
        const storedMno = localStorage.getItem('mno');
        const storedRoleSet = JSON.parse(localStorage.getItem('roleSet'));

        if (storedMno) {
            setLoggedInMno(storedMno);
        }

        if (storedRoleSet) {
            setRoleSet(storedRoleSet);
        }

        // 컴포넌트가 마운트될 때 멤버 정보를 최신 상태로 불러옵니다.
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/member/${member.mno}`);
                setUpdatedMember(response.data);
            } catch (error) {
                console.error('멤버 정보를 불러오는 중 오류가 발생했습니다.', error);
            }
        };
        fetchMember();
        fetchLectures();
    }, [member.mno]);

    const handleDelete = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8092/member/delete/${updateMember.mno}`);
                onMemberDeleted(); // 삭제 후 콜백 호출
            } catch (error) {
                console.error('강사 정보를 삭제하는 중 오류가 발생했습니다.', error);
            }
        }
    };

    const canEditOrDelete = roleSet.includes('ADMIN') || loggedInMno === member.mno;

    return (
        <>
            <div className="card profile_card">
                <div className="d-flex flex-wrap main_info">
                    <div>
                        {member.m_picture ?
                            <img
                                className="img-thumbnail picture float-start"
                                src={member.m_picture} alt="프로필 사진" />
                            :
                            <img
                                className="img-thumbnail picture float-start"
                                src={defaultImage} alt="프로필 사진" />
                        }
                        </div>
                    <div className="d-flex flex-column info_list">
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">이름</label>
                            <p>{member.m_name}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">강사 번호</label>
                            <p>{member.mno}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">이메일</label>
                            <p>{member.m_email}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">전화번호</label>
                            <p>{member.m_phone}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">주소1</label>
                            <p>{member.m_address1}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">주소2</label>
                            <p>{member.m_address2}</p>
                        </div>
                    </div>
                </div>
                <div>
                    {canEditOrDelete && (
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                            <div className="btn-group mt-3">
                                <button type="button" className="btn btn-outline-primary" onClick={onEditClick}>수정</button>
                                <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>삭제</button>
                            </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="card profile_card">
                <div className="d-flex flex-wrap main_info">
                    <div className="d-flex flex-column class_list">
                        <h4>담당 강의</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>강의 코드</th>
                                    <th>강의명</th>
                                    <th>시작일자</th>
                                    <th>등록일자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lectures.map((lec) => (
                                    <tr key={lec.lno}>
                                        <td>{lec.lno}</td>
                                        <td>{lec.l_name}</td>
                                        <td>{lec.l_start}</td>
                                        <td>{lec.l_end}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Read;
