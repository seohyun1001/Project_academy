import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Read from '../Read/Read'; 
import Modify from '../Modify/Modify';
import Header from '../../Basic/Header';
import Footer from '../../Basic/Footer';

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
        <div class="row  text-center ">
            <Header />
            <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
            <a
                        class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                        <input class="form-control me-2" 
                                type="search" placeholder="Search" aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                />
                        <button class="btn btn-outline-dark" type="submit">Search</button>
                    </a>
                    <div className="list-group list-group-flush border-bottom scrollarea">
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
                            {/* <div className="col-10 small">Some placeholder content</div> */}
                        </a>
                    ))}
                </div>
            </div>
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
            <Footer />
        </div>
    );
};


export default List;