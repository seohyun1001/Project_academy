import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const UndefinedModal = ({ show, handleClose, newMno, refreshData }) => {
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/lecture/memberLectures`, { params: { mno: 1000 } });
                setLectures(response.data);
            } catch (error) {
                console.error("Error fetching the lectures:", error);
                window.alert("Lectures not found for member with id 1000");
            }
        };

        if (show) {
            fetchLectures();
        }
    }, [show]);

    const handleLectureClick = async (lecture) => {
        if (window.confirm(`강의 ${lecture.l_name}를 추가하시겠습니까?`)) {
            try {
                const updatedLecture = { ...lecture, mno: newMno };
                await axios.post(`http://localhost:8092/lecture/modify`, updatedLecture);
                alert('추가되었습니다.');
                handleClose();
                refreshData();
            } catch (error) {
                console.error('강의를 추가하는 중 오류가 발생했습니다.', error);
                alert('강의를 추가하는 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>강의 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table>
                    <thead>
                        <tr>
                            <th>강의 코드</th>
                            <th>강의명</th>
                            <th>시작일자</th>
                            <th>종료일자</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lectures.map((lec) => (
                            <tr key={lec.lno} >
                                <td>{lec.lno}</td>
                                <td>{lec.l_name}</td>
                                <td>{lec.l_start}</td>
                                <td>{lec.l_end}</td>
                                <td onClick={() => handleLectureClick(lec)}>추가</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UndefinedModal;