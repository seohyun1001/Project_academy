import React, { useState  } from 'react';

const List = ({members, selectedMember, setSelectedMember,fetchMember,setIsEditing}) => {
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

    const handleMemberClick = (mno) => {
        if (selectedMember && selectedMember.mno === mno) {
            setSelectedMember(null); // 이미 선택된 강사를 다시 클릭하면 상세 정보 숨기기
        } else {
            fetchMember(mno);
            setIsEditing(false); // 수정 모드 해제
        }
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
            {/* <Header /> */}
            <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                    <a class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
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
            
            {/* <Footer /> */}
        </div>
    );
};


export default List;