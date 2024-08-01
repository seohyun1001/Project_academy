
import Read from "./Read/Read";
import Modify from './Modify/Modify';
import MemberRegister from "./memberRegister/MemberRegister";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemberList from "./List/MemberList";
import Header from "../Header";
import Footer from "../Footer";

const Member = () => {
    const [members, setMembers] = useState([]); // 강사 목록
    const [selectedMember, setSelectedMember] = useState(null); // 선택된 강사 정보
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    const [showRegister, setShowRegister] = useState(false); // 회원 등록 화면 표시 여부
    const [roleSet, setRoleSet] = useState([]);
    const [loggedInMno, setLoggedInMno] = useState(null);

    // 컴포넌트가 처음 렌더링될 때 강사 목록을 가져옵니다.
    useEffect(() => {
        fetchMembers();

        const storedMno = localStorage.getItem('mno');
        const storedRoleSet = JSON.parse(localStorage.getItem('roleSet'));

        if (storedMno) {
            setLoggedInMno(storedMno);
        }

        if (storedRoleSet) {
            setRoleSet(storedRoleSet);
        }
    }, []);

    // 강사 목록을 새로고침합니다.
    const fetchMembers = () => {
        axios.get('http://localhost:8092/member/list')
            .then(response => setMembers(response.data))
            .catch(error => console.error('강사를 불러오는 중에 오류가 발생했습니다.', error));
    };
    // 선택된 강사의 상세 정보를 가져옵니다.
    const fetchMember = (mno) => {
        axios.get(`http://localhost:8092/member/read/${mno}`)
            .then(response => setSelectedMember(response.data))
            .catch(error => console.error('강사 상세 정보를 불러오는 중에 오류가 발생했습니다: ', error));
    };

    // 강사가 삭제된 후 목록을 새로고침하고 선택된 강사 정보를 초기화합니다.
    const handleMemberDeleted = () => {
        fetchMembers();  // 강사 삭제 후 목록 새로고침
        setSelectedMember(null);  // 선택된 강사 정보 초기화
    };

    // 강사 정보가 수정된 후 목록과 선택된 강사 정보를 업데이트합니다.
    const handleMemberUpdated = (updatedMember) => {
        if (updatedMember) {
            setMembers(prevMembers => prevMembers.map(member =>
                member.mno === updatedMember.mno ? updatedMember : member
            ));
            setSelectedMember(updatedMember);
        }
        setIsEditing(false);
    };

    return (

        <>
            <MemberList
                members={members}
                selectedMember={selectedMember}
                setSelectedMember={setSelectedMember}
                fetchMember={fetchMember}
                setIsEditing={setIsEditing}
                showRegister={showRegister}
                setShowRegister={setShowRegister}
            />
            <div className="col">
                <div style={{ flex: 1 }}> {/*사이드바 옆에 위치할 수 있게 함 */}
                    {showRegister ? (
                        <MemberRegister />
                    ) : (
                        <>
                            {selectedMember && !isEditing && (
                                <Read
                                    member={selectedMember}
                                    onEditClick={() => setIsEditing(true)} // 수정 버튼 클릭 시 수정 모드로 전환
                                    onMemberDeleted={handleMemberDeleted}  // 삭제 후 목록 새로고침 콜백 전달
                                />
                            )}
                            {selectedMember && isEditing && (
                                <Modify
                                    member={selectedMember}
                                    onSave={handleMemberUpdated}
                                    onMemberDeleted={handleMemberDeleted} // 삭제 후 목록 새로고침 콜백 전달
                                    setSelectedMember={setSelectedMember}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>

    );
};

export default Member;
