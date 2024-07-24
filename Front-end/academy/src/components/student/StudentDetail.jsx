import React from 'react';

const StudentDetail = ({ student }) => {
    return (
        <div>
            <h2>{student.s_name} 상세 정보</h2>
            <p>생년월일: {student.s_birthday}</p>
            <p>이메일: {student.s_email}</p>
            <p>전화번호: {student.s_phone}</p>
            <p>주소: {student.s_address1} {student.s_address2}</p>
            <p>추가정보: {student.s_status}</p>
        </div>
    );
};

export default StudentDetail;