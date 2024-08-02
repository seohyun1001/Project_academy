import React, { useState, useEffect } from 'react';

const MemberList = ({ members, selectedMember, setSelectedMember, fetchMember, setIsEditing, showRegister, setShowRegister }) => {
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const [roleSet, setRoleSet] = useState([]);

    useEffect(() => {
        const storedRoleSet = JSON.parse(localStorage.getItem('roleSet'));
        if (storedRoleSet) {
            setRoleSet(storedRoleSet);
        }
    }, []);

    const handleMemberClick = (mno) => {
        if (selectedMember && selectedMember.mno === mno) {
            setSelectedMember(null); // 이미 선택된 강사를 다시 클릭하면 상세 정보 숨기기
        } else {
            fetchMember(mno);
            setIsEditing(false); // 수정 모드 해제
        }
    };

    const handleRegisterClick = () => {
        setShowRegister(!showRegister); // 등록 버튼을 누르면 showRegister 상태 토글
        setSelectedMember(null);  // 선택된 강사 정보 초기화
        setIsEditing(false); // 수정 모드 해제
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색어에 따라 목록 필터링
    const filteredMembers = members.filter(member =>
        member.m_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !member.mno.toString().startsWith('1') // mno가 1로 시작하는 강사 제외
    );

    return (
        <div className="row text-center">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                <a className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                    <input className="form-control me-2" 
                        type="search" placeholder="Search" aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {roleSet.includes('ADMIN') && (
                        <button className="btn btn-outline-dark l_register_btn" type="button" onClick={handleRegisterClick}>
                            {showRegister ? '취소' : '등록'}
                        </button>
                    )}
                </a>
                <div className="list-group list-group-flush border-bottom scrollarea scrollBar">
                    {filteredMembers.map(member => (
                        <a
                            className="list-group-item list-group-item-action"
                            key={member.mno}
                            onClick={() => handleMemberClick(member.mno)}
                        >
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{member.m_name}</strong>
                                <small className="text-body-secondary">{member.mno}</small>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemberList;
