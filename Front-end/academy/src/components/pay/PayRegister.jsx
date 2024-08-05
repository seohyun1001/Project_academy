import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayRegister = ({ sno, s_name, onClose }) => {
    const [pay, setPay] = useState({
        paid: false,
        lno: '',
        l_name: '',
        sno: sno || '',
        s_name: s_name || ''
    });

    const [lectures, setLectures] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get('/lecture/list');
                setLectures(response.data);
            } catch (error) {
                console.error('Failed to fetch lectures', error);
            }
        };

        fetchLectures();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPay({ ...pay, [name]: type === 'checkbox' ? checked : value });
    };

    const handleLectureChange = (e) => {
        const selectedLecture = lectures.find(lecture => lecture.lno === e.target.value);
        setPay({ ...pay, lno: selectedLecture.lno, l_name: selectedLecture.l_name });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/pay', pay);
            if (response.status === 200) {
                alert('등록 성공');
                navigate('/student'); // 등록 성공 후 메인 페이지로 이동
                onClose(); // 모달 닫기
                window.location.reload(); // 페이지 새로고침
            } else {
                alert('등록 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('등록 중 오류가 발생했습니다.', error);
            alert('등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className='card-head counseling_head'>
                    <h2>결제 등록</h2>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='counselingRegister'>학생:</label>
                            <span>{pay.sno} - {pay.s_name}</span>
                        </div>
                        <div>
                            <label className='counselingRegister'>강의 선택:</label>
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
                            <label className='counselingRegister'>결제 여부:</label>
                            <input
                                type="checkbox"
                                name="paid"
                                checked={pay.paid}
                                onChange={handleChange}
                            />
                        </div>


                        <div className='counselingRegister'>
                            <button type="submit" style={{ margin: "5px" }}>등록</button>
                            <button type="button" style={{ margin: "5px" }} onClick={onClose}>닫기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PayRegister;
