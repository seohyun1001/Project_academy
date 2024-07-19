import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentList = () => {
    const [students, setStudents] = useState([]); // 다수의 학생 정보

    useEffect(() => {
        axios.get('/student', StudentList)
            .then(response => setStudents(response.data))
            .catch(error => console.error('학생을 불러오는 중에 다음과 같은 오류가 발생했습니다: ', error));
    }, []);

    return (
        <div>
            <h1>학생 목록</h1>
            <table>
                <thread>
                    
                </thread>

                <tbody>
                    <tr>
                        <th>학생 번호</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th>추가정보</th>
                        <th>상세보기</th>
                    </tr>

                    {students.map(student => (
                        <tr key={student.sno}>
                            <td>{student.sno}</td>
                            <td>{student.s_name}</td>
                            <td>{student.s_birthday}</td>
                            <td>{student.s_email}</td>
                            <td>{student.s_phone}</td>
                            <td>{student.s_status}</td>
                            <td>{student.s_address1} {student.s_address2}</td>
                            <td><Link to={`/student/${student.sno}`}>상세보기</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default StudentList;