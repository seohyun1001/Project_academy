import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CounselingEdit = ({ cno, onClose }) => {
    const [counseling, setCounseling] = useState({
        c_content: '',
        lno: '',
        l_name: '',
        sno: '',
        s_name: ''
    });
    const [lectures, setLectures] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCounseling = async () => {
            try {
                const response = await axios.get(`/counseling/${cno}`);
                setCounseling(response.data);
            } catch (error) {
                console.error('Failed to fetch counseling details', error);
            }
        };

        const fetchLectures = async () => {
            try {
                const response = await axios.get('/lecture/list');
                setLectures(response.data);
            } catch (error) {
                console.error('Failed to fetch lectures', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get('/student');
                setStudents(response.data);
            } catch (error) {
                console.error('Failed to fetch students', error);
            }
        };

        fetchCounseling();
        fetchLectures();
        fetchStudents();
    }, [cno]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCounseling({
            ...counseling,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLectureChange = (e) => {
        const selectedLecture = lectures.find(lecture => lecture.lno === e.target.value);
        setCounseling({ ...counseling, lno: selectedLecture.lno, l_name: selectedLecture.l_name });
    };

    const handleStudentChange = (e) => {
        const selectedStudent = students.find(student => student.sno.toString() === e.target.value);
        setCounseling({ ...counseling, sno: selectedStudent.sno, s_name: selectedStudent.s_name });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/counseling/${cno}`, counseling);
            alert('수정 성공');
            onClose(); // 수정 성공 후 모달 닫기
            window.location.reload(); // 페이지 새로고침
        } catch (error) {
            console.error('상담 수정 중 오류가 발생했습니다.', error);
            alert('상담 수정 중 오류가 발생했습니다.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/counseling/${cno}`);
                alert('삭제 성공');
                onClose(); // 삭제 성공 후 모달 닫기
                window.location.reload(); // 페이지 새로고침
            } catch (error) {
                console.error('상담 삭제 중 오류가 발생했습니다.', error);
                alert('상담 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className='card-head counseling_head'>
                    <h2>상담 수정</h2>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='counselingRegister'>강의 선택:</label>
                            <select name="lno" value={counseling.lno} onChange={handleLectureChange} required>
                                <option value="">강의를 선택하세요</option>
                                {lectures.map(lecture => (
                                    <option key={lecture.lno} value={lecture.lno}>
                                        {lecture.lno} - {lecture.l_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='d-flex'>
                            <label className='counselingRegister'>상담 내용:</label>
                            <textarea
                                type="text"
                                name="c_content"
                                value={counseling.c_content}
                                onChange={handleChange}
                                required
                                style={{ width: '450px', height: '250px' }}
                            />
                        </div>

                        <div>
                            {/* <label>학생 선택:</label>
                        <select name="sno" value={counseling.sno} onChange={handleStudentChange} required>
                            <option value="">학생을 선택하세요</option>
                            {students.map(student => (
                                <option key={student.sno} value={student.sno.toString()}>
                                    {student.sno} - {student.s_name}
                                </option>
                            ))}
                        </select> */}
                        </div>
                        <div className='d-flex justify-content-between counselingRegister'>
                            <div>
                                <button type="submit" style={{ marginRight: "5px" }}>수정</button>
                                <button type="button" style={{ marginRight: "5px" }} onClick={handleDelete}>삭제</button>

                            </div>
                            <button type="button" style={{ marginRight: "5px" }} onClick={onClose}>닫기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CounselingEdit;
