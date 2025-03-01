import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LectureInfo from "./LectureInfo";
import LectureInfoRegister from "./LectureInfoRegister";

const LectureList = () => {
    const [lectures, setLectures] = useState([]);
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [selectedLectureId, setSelectedLectureId] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchLectures();
    }, []);

    useEffect(() => {
        setFilteredLectures(
            lectures.filter(lecture =>
                lecture.l_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, lectures]); // 검색어 또는 강의 목록이 변경될 때 필터링

    const fetchLectures = async () => {
        try {
            const response = await axios.get('http://localhost:8092/lecture/list');
            setLectures(response.data);
        } catch (error) {
            console.error("Failed to fetch lectures", error);
        }
    }

    const handleLectureClick = (lectureId) => {
        if (selectedLectureId === lectureId) {
            setSelectedLectureId(null);  // 같은 강의를 다시 클릭하면 선택을 해제합니다.
        } else {
            setSelectedLectureId(lectureId);
            setShowRegister(false);  // LectureInfo를 표시하고 Register 컴포넌트는 숨깁니다.
        }
    };

    const handleRegisterClick = () => {
        if (showRegister) {
            setShowRegister(false);  // 등록 버튼을 다시 클릭하면 Register 컴포넌트를 숨깁니다.
        } else {
            setSelectedLectureId(null);  // 선택된 강의 ID를 초기화합니다.
            setShowRegister(true);  // Register 컴포넌트를 표시합니다.
        }
    };

    const handleModificationComplete = () => { // Added handleModificationComplete function
        fetchLectures(); // Refetch lectures list
        setSelectedLectureId(null);
    };

    const handleSearchChange = (e) => { // 검색어 변경 핸들러 추가
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div class="row  text-center ">
                <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                    <div
                        class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange} // 검색어 변경 핸들러 연결
                        />
                        <button class="btn btn-outline-dark l_register_btn" type="button" onClick={handleRegisterClick}>등록</button>
                    </div>
                    <div class="list-group list-group-flush border-bottom scrollarea scrollBar">

                        {filteredLectures.length > 0 ? (
                            filteredLectures.map((lecture) => (
                                <a
                                    key={lecture.lno}  // 각 항목에 고유한 키를 부여합니다.
                                    href="#"
                                    onClick={() => handleLectureClick(lecture.lno)}
                                    className="list-group-item list-group-item-action py-3 lh-sm"
                                    aria-current="true"
                                >
                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                        <strong className="mb-1">{lecture.l_name}</strong>  {/* l_name 데이터 */}
                                        <small>{lecture.lno}</small>  {/* lno 데이터 */}
                                    </div>
                                    <div className="col-10 small">
                                        {lecture.l_start} ~ {lecture.l_end}  {/* 추가 정보 표시 */}
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="list-group-item list-group-item-action py-3 lh-sm">
                                검색 결과가 없습니다
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div class="col">
                {!showRegister && selectedLectureId && (
                    <LectureInfo
                        lectureId={selectedLectureId}
                        onModificationComplete={handleModificationComplete}
                    />
                )}
                {showRegister && (
                    <LectureInfoRegister
                        onRegisterComplete={handleModificationComplete}
                        setShowRegister={setShowRegister}
                    />
                )}
            </div>
        </>
    )
}

export default LectureList;