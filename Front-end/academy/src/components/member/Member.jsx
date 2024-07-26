import Footer from "../Basic/Footer";
import Header from "../Basic/Header";
import List from "./List/List";
import Read from "./Read/Read";
import Modify from './Modify/Modify';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Member = () => {
    const [members, setMembers] = useState([]); // 강사 목록
    const [selectedMember, setSelectedMember] = useState(null); // 선택된 강사 정보
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    useEffect(() => {
        fetchMembers();
    }, []);
    const handleMemberDeleted = () => {
        fetchMembers();  // 학생 삭제 후 목록 새로고침
        setSelectedMember(null);  // 선택된 학생 정보 초기화
    };
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
    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <div class="d-flex flex-wrap">
                    <List 
                    members={members} 
                    selectedMember={selectedMember} 
                    setSelectedMember={setSelectedMember}
                    fetchMember={fetchMember} 
                    setIsEditing = {setIsEditing}
                    />
                    <div class="col">
                        <div style={{ flex: 1 }}> {/*사이드바 옆에 위치할 수 있게 함 */}
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
                </div>
            </div>
            <Footer />
        </body>
    )
}
export default Member;