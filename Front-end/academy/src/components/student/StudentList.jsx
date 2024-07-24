import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentDetail from "./StudentDetail"; // 상세 정보 컴포넌트 불러오기


const StudentList = () => {
    const [students, setStudents] = useState([]); // 다수의 학생 정보
    const [selectedStudent, setSelectedStudent] = useState(null); // 선택된 학생 정보, ()안에 null을 넣어 초기상태에 아무 값도 가지지 않게 함

    // useEffect(() => {
    //     axios.get('http://localhost:8092/student')
    //         .then(response => setStudents(response.data))
    //         .catch(error => console.error('학생을 불러오는 중에 다음과 같은 오류가 발생했습니다: ', error));
    // }, []);

    const fetchStudents = () => {
        axios.get('http://localhost:8092/student')
            .then(response => setStudents(response.data))
            .catch(error => console.error('학생을 불러오는 중에 오류가 발생했습니다.', error));
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleStudentClick = (sno) => {
        if (selectedStudent && selectedStudent.sno === sno) {
            setSelectedStudent(null); // 이미 선택된 학생을 다시 클릭하면 상세 정보 숨기기
        } else {
            axios.get(`http://localhost:8092/student/${sno}`)
                .then(response => setSelectedStudent(response.data))
                .catch(error => console.error('학생 상세 정보를 불러오는 중에 다음과 같은 오류가 발생했습니다: ', error));
        }
    };

    const handleStudentDeleted = () => {
        fetchStudents();  // 학생 삭제 후 목록 새로고침
        setSelectedStudent(null);  // 선택된 학생 정보 초기화
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h1>학생 목록</h1>
                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.sno}>
                                <td>
                                    <button
                                        onClick={() => handleStudentClick(student.sno)}
                                        style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                    >
                                        {student.s_name}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ flex: 2 }}>
                {selectedStudent && (
                    <StudentDetail student={selectedStudent}
                        onStudentDeleted={handleStudentDeleted}  // 삭제 후 목록 새로고침 콜백 전달
                    />
                )}
            </div>
        </div>
    );
};

export default StudentList;