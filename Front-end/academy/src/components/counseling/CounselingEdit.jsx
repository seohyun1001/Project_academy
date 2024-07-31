import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CounselingEdit = () => {
    const { cno } = useParams();
    const navigate = useNavigate();
    const [counseling, setCounseling] = useState({
        c_content: '',
        lno: '',
        l_name: '',
        sno: '',
        s_name: ''
    });
    const [lectures, setLectures] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchCounseling = async () => {
            try {
                const response = await axios.get(`/counseling/${cno}`);
                setCounseling(response.data);
            } catch (error) {
                console.error('Failed to fetch counseling', error);
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
        const { name, value } = e.target;
        setCounseling({ ...counseling, [name]: value });
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
            navigate('/counseling/list');
        } catch (error) {
            console.error('상담 수정 중 오류가 발생했습니다.', error);
            alert('상담 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>상담 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>상담 내용:</label>
                        <input
                            type="text"
                            name="c_content"
                            value={counseling.c_content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>강의 선택:</label>
                        <select name="lno" value={counseling.lno} onChange={handleLectureChange} required>
                            <option value="">강의를 선택하세요</option>
                            {lectures.map(lecture => (
                                <option key={lecture.lno} value={lecture.lno}>
                                    {lecture.lno} - {lecture.l_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>학생 선택:</label>
                        <select name="sno" value={counseling.sno} onChange={handleStudentChange} required>
                            <option value="">학생을 선택하세요</option>
                            {students.map(student => (
                                <option key={student.sno} value={student.sno.toString()}>
                                    {student.sno} - {student.s_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">수정</button>
                </form>
            </div>
        </div>
    );
};

export default CounselingEdit;
