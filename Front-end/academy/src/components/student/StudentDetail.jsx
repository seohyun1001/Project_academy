import React from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const StudentDetail = ({ student, onStudentDeleted }) => {
    // const navigate = useNavigate;

    const handleDelete = () => {

        // 사용자에게 삭제 확인 요청(취소 시 아무 작업도 수행하지 않음)
        // window.confirm 매서드 : 확인을 누르면 true를 반환하고 취소를 누르면 false를 반환함
        const confirmed = window.confirm(`${student.s_name} 학생의 정보를 삭제 하시겠습니까?`);


        if (confirmed) {

            axios.delete(`http://localhost:8092/student/${student.sno}`)
                .then(() => {
                    console.log(`${student.s_name} 학생 정보 삭제 완료`)
                    alert(`${student.sno} 번 ${student.s_name} 이(가) 삭제되었습니다.`);

                    if (onStudentDeleted) {
                        onStudentDeleted();  // 삭제 후 목록 업데이트를 위해 콜백 호출
                    }
                    // navigate('/student');  // 삭제 후 학생 목록 페이지로 이동 , 사용 시 삭제 후 에러 발생
                })
                .catch(error => {
                    console.error('학생 삭제 도중 오류가 발생했습니다.', error);
                    alert(`${student.s_name} 학생 정보 삭제 도중 오류가 발생했습니다.` + (error.response ? error.response.data : error.message));
                });
        };
    };

    return (
        <div>
            <h2>{student.s_name} 상세 정보</h2>
            <p>생년월일: {student.s_birthday}</p>
            <p>이메일: {student.s_email}</p>
            <p>전화번호: {student.s_phone}</p>
            <p>주소: {student.s_address1} {student.s_address2}</p>
            <p>추가정보: {student.s_status}</p>
            <button onClick={handleDelete} className="btn btn-danger">삭제</button>
        </div>
    );
};

export default StudentDetail;