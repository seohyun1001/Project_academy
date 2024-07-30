import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PayEdit = () => {
    const { pno } = useParams(); // URL에서 pno 파라미터를 가져옴
    const [pay, setPay] = useState({
        paid: false,
        lno: '',
        l_name: '',
        sno: '',
        s_name: ''
    });
    const [lectures, setLectures] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPay = async () => {
            try {
                const response = await axios.get(`/pay/${pno}`);
                setPay(response.data);
            } catch (error) {
                console.error('Failed to fetch pay details', error);
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

        fetchPay();
        fetchLectures();
        fetchStudents();
    }, [pno]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPay({
            ...pay,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLectureChange = (e) => {
        const selectedLecture = lectures.find(lecture => lecture.lno === e.target.value);
        setPay({ ...pay, lno: selectedLecture.lno, l_name: selectedLecture.l_name });
    };

    const handleStudentChange = (e) => {
        const selectedStudent = students.find(student => student.sno.toString() === e.target.value);
        setPay({ ...pay, sno: selectedStudent.sno, s_name: selectedStudent.s_name });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/pay/${pno}`, pay);
            alert('수정 성공');
            navigate('/pay/list'); // 수정 성공 후 결제 목록 페이지로 이동
        } catch (error) {
            console.error('결제 수정 중 오류가 발생했습니다.', error);
            alert('결제 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>결제 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>결제 여부:</label>
                        <input
                            type="checkbox"
                            name="paid"
                            checked={pay.paid}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>강의 선택:</label>
                        <select name="lno" value={pay.lno} onChange={handleLectureChange} required>
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
                        <select name="sno" value={pay.sno} onChange={handleStudentChange} required>
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

export default PayEdit;
