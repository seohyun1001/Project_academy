import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LectureList = () => {
    const [lectures, setLectures] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();

    // 컴포넌트가 렌더링될 때 데이터를 가져옵니다.
    useEffect(() => {
        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        try {
            const response = await axios.get('http://localhost:8092/lecture/list');
            setLectures(response.data);  // 받아온 데이터를 상태에 저장합니다.
        } catch (error) {
            console.error("Failed to fetch lectures", error);
        }
            
    }


    return (
        <>
            <div class="row  text-center ">
                <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                    <a href="/"
                        class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-dark" type="submit">Search</button>
                    </a>
                    <div class="list-group list-group-flush border-bottom scrollarea scrollBar">

                    {lectures.map((lecture) => (
                        <a
                            key={lecture.lno}  // 각 항목에 고유한 키를 부여합니다.
                            href="#"
                            className="list-group-item list-group-item-action py-3 lh-sm"
                            aria-current="true"
                        >
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{lecture.l_name}</strong>  {/* l_name 데이터 */}
                                <small>{lecture.lno}</small>  {/* lno 데이터 */}
                            </div>
                            <div className="col-10 small">
                                {lecture.l_category} - {lecture.l_classroom}  {/* 추가 정보 표시 */}
                            </div>
                        </a>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LectureList;