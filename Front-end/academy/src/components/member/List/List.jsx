import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Read from '../Read/Read'; 
import Modify from '../Modify/Modify';

const List = () => {
    const [members, setMembers] = useState([]); // 강사 목록
    const [selectedMember, setSelectedMember] = useState(null); // 선택된 강사 정보
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

    const fetchMembers = () => {
        axios.get('http://localhost:8092/member/list')
            .then(response => setMembers(response.data))
            .catch(error => console.error('학생을 불러오는 중에 오류가 발생했습니다.', error));
    };

    const fetchMember = (mno) => {
        axios.get(`http://localhost:8092/member/read/${mno}`)
            .then(response => setSelectedMember(response.data))
            .catch(error => console.error('강사 상세 정보를 불러오는 중에 오류가 발생했습니다: ', error));
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleMemberClick = (mno) => {
        if (selectedMember && selectedMember.mno === mno) {
            setSelectedMember(null); // 이미 선택된 강사를 다시 클릭하면 상세 정보 숨기기
        } else {
            fetchMember(mno);
            setIsEditing(false); // 수정 모드 해제
        }
    };

    const handleMemberDeleted = () => {
        fetchMembers();  // 학생 삭제 후 목록 새로고침
        setSelectedMember(null);  // 선택된 학생 정보 초기화
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색어에 따라 목록 필터링
    const filteredMembers = members.filter(member =>
        member.m_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h1>강사 목록</h1>
                <input
                    type="text"
                    placeholder="강사 검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginBottom: "10px", width: "100%", padding: "5px" }}
                />
                <table>
                    <thead>
                        <tr>
                            <th>강사 이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map(member => (
                            <tr key={member.mno}>
                                <td>
                                    <button
                                        onClick={() => handleMemberClick(member.mno)}
                                        style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                    >
                                        {member.m_name}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ flex: 2 }}>
                {selectedMember && !isEditing && (
                    <Read 
                    member={selectedMember}
                    onEditClick={()=> setIsEditing(true)} //수정 버튼 클릭 시 수정 모드로 전환
                    onMemberDeleted={handleMemberDeleted}  // 삭제 후 목록 새로고침 콜백 전달
                    />
                )}
                {selectedMember && isEditing &&(
                    <Modify 
                    member={selectedMember} 
                    onSave={()=>{
                        fetchMember(selectedMember.mno); // 수정 후 최신 데이터 불러오기
                        setIsEditing(false);
                    }}
                    onMemberDeleted={handleMemberDeleted} // 삭제 후 목록 새로고침 콜백 전달
                    />
                )}
            </div>
        </div>
    );
};

export default List;