// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StudentDetail from "./StudentDetail"; // 상세 정보 컴포넌트 불러오기
// import { useNavigate } from "react-router-dom";


// const StudentList = () => {
//     const [students, setStudents] = useState([]); // 다수의 학생 정보
//     const [selectedStudent, setSelectedStudent] = useState(null); // 선택된 학생 정보, ()안에 null을 넣어 초기상태에 아무 값도 가지지 않게 함
//     const navigate = useNavigate();
//     // useEffect(() => {
//     //     axios.get('http://localhost:8092/student')
//     //         .then(response => setStudents(response.data))
//     //         .catch(error => console.error('학생을 불러오는 중에 다음과 같은 오류가 발생했습니다: ', error));
//     // }, []);

//     const fetchStudents = () => {
//         axios.get('http://localhost:8092/student')
//             .then(response => setStudents(response.data))
//             .catch(error => console.error('학생을 불러오는 중에 오류가 발생했습니다.', error));
//     };

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const handleRegister = () => {
//         navigate('/student/register');
//     }

//     const handleStudentClick = (sno) => {
//         if (selectedStudent && selectedStudent.sno === sno) {
//             setSelectedStudent(null); // 이미 선택된 학생을 다시 클릭하면 상세 정보 숨기기
//         } else {
//             axios.get(`http://localhost:8092/student/${sno}`)
//                 .then(response => setSelectedStudent(response.data))
//                 .catch(error => console.error('학생 상세 정보를 불러오는 중에 다음과 같은 오류가 발생했습니다: ', error));
//         }
//     };

//     const handleStudentDeleted = () => {
//         fetchStudents();  // 학생 삭제 후 목록 새로고침
//         setSelectedStudent(null);  // 선택된 학생 정보 초기화
//     };

//     return (
//         <div style={{ display: "flex" }}>
//             <div style={{ flex: 1, marginRight: "20px" }}>
//                 <h1>학생 목록</h1>
//                 <button className="btn btn-primary" onClick={handleRegister}>추가</button>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>이름</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {students.map(student => (
//                             <tr key={student.sno}>
//                                 <td>
//                                     <button
//                                         onClick={() => handleStudentClick(student.sno)}
//                                         style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
//                                     >
//                                         {student.s_name}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div style={{ flex: 2 }}>
//                 {selectedStudent && (
//                     <StudentDetail student={selectedStudent}
//                         onStudentDeleted={handleStudentDeleted}  // 삭제 후 목록 새로고침 콜백 전달
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StudentList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentList = ({ onStudentClick }) => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const fetchStudents = () => {
        axios.get('http://localhost:8092/student')
            .then(response => setStudents(response.data))
            .catch(error => console.error('학생을 불러오는 중에 오류가 발생했습니다.', error));
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleRegister = () => {
        navigate('/student/register');
    };

    const handleStudentClick = (sno) => {
        axios.get(`http://localhost:8092/student/${sno}`)
            .then(response => onStudentClick(response.data))
            .catch(error => console.error('학생 상세 정보를 불러오는 중에 오류가 발생했습니다.', error));
    };


    return (
        <div className="row text-center">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                <a href="/"
                    className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-dark" type="submit">Search</button>
                </a>
                <button className="btn btn-primary mb-3" onClick={handleRegister}>추가</button>
                <div className="list-group list-group-flush border-bottom scrollarea scrollBar">
                    {students.map(student => (
                        <a href="#" className="list-group-item list-group-item-action py-3 lh-sm"
                            key={student.sno}
                            aria-current="true"
                            onClick={() => handleStudentClick(student.sno)}>
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{student.s_name}</strong>
                                <small>{student.sno}</small>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentList;