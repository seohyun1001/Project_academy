import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDetail = ({ student }) => {
    const navigate = useNavigate();



    const handleDelete = async () => {

        // 사용자에게 삭제 확인 요청(취소 시 아무 작업도 수행하지 않음)
        // window.confirm 매서드 : 확인을 누르면 true를 반환하고 취소를 누르면 false를 반환함
        if (window.confirm(`${student.s_name} 학생의 정보를 삭제 하시겠습니까?`)) {
            try {
                await axios.delete(`http://localhost:8092/student/${student.sno}`);
                console.log(`${student.s_name} 학생 정보 삭제 완료`);
                alert(`${student.sno} 번 ${student.s_name} 이(가) 삭제되었습니다.`);

                // 페이지를 새로고침하여 최신 상태 반영
                window.location.reload();
            } catch (error) {
                console.error('학생 정보 삭제 중 오류가 발생했습니다: ', error);
                alert('학생 정보 삭제 중 오류가 발생했습니다.');
            }
        }
    };


    const handleEdit = () => {
        navigate(`/student/edit/${student.sno}`);
    };


    return (
        <div className="card">
            <div className="card-header">
                <h3>{student.s_name} 학생 상세 정보</h3>
            </div>
            <div className="card-body">
                <p><strong>생년월일:</strong> {student.s_birthday}</p>
                <p><strong>메일:</strong> {student.s_email}</p>
                <p><strong>전화번호:</strong> {student.s_phone}</p>
                <p><strong>상태:</strong> {student.s_status}</p>
                <p><strong>주소 1:</strong> {student.s_address1}</p>
                <p><strong>주소 2:</strong> {student.s_address2}</p>
                <button className="btn btn-primary" onClick={handleEdit}>수정</button>
                <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default StudentDetail;