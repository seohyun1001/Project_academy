import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentList = ({ onStudentClick, onRegisterClick }) => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // 학생 목록을 서버에서 가져오기
        axios.get('http://localhost:8092/student')
            .then(response => {
                setStudents(response.data);
                setFilteredStudents(response.data); // 처음 로드 시 필터링된 학생 목록도 설정
            })
            .catch(error => console.error('학생을 불러오는 중에 오류가 발생했습니다.', error));
    }, []);

    useEffect(() => {
        // 검색어에 따라 학생 목록 필터링
        setFilteredStudents(
            students.filter(student =>
                student.s_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, students]);

    const handleRegister = () => {
        if (onRegisterClick) {
            onRegisterClick(); // 등록 버튼 클릭 시 핸들러 호출
        }
    };

    const handleStudentClick = (sno) => {
        axios.get(`http://localhost:8092/student/${sno}`)
            .then(response => onStudentClick(response.data))
            .catch(error => console.error('학생 상세 정보를 불러오는 중에 오류가 발생했습니다.', error));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
    };

    return (
        <div className="row text-center">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                <a className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis border-bottom">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="검색어를 입력해주세요."
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-outline-dark l_register_btn" onClick={handleRegister}>등록</button>
                </a>

                <div className="list-group list-group-flush border-bottom scrollarea scrollBar">
                    {filteredStudents.map(student => (
                        <a href="#" className="list-group-item list-group-item-action py-3 lh-sm"
                            key={student.sno}
                            aria-current="true"
                            onClick={() => handleStudentClick(student.sno)}>
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{student.s_name}</strong>
                                <small>{student.sno}</small>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentList;
