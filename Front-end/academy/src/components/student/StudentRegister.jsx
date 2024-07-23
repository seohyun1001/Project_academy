import React, { useState } from "react";
import axios from "axios";

const StudentRegister = () => {
    const [student, setStudent] = useState({  // 한명의 학생 등록
        s_name: "",
        s_birthday: "",
        s_email: "",
        s_phone: "",
        s_status: "",
        s_address1: "",
        s_address2: ""
    });


    // handleChange 함수는 입력 필드에서 사용자가 값을 입력할 때마다 호출되어 입력된 값을 상태에 업데이트 함
    const handleChange = (e) => {  // 'e'는 이벤트 객체를 나타냄
        const {name, value} = e.target;  // 'e.target'은 이벤트가 발생한 요소를 나타냄
        //  name과 value는 각각 입력 필드의 'name' 속성과 현재 입력된 값
        setStudent(prevState => ({  // 'prevState'는 상태 업데이트 함수에 전달되는 콜백 함수의 인자(이전 상태)
            ...prevState,  // 이전 상태를 복사함
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8092/student', student)
        .then(response => {
            // const sno = response.data;  // 응답에서 sno를 추출해야함
            // alert(`${sno} 번 학생이 성공적으로 등록되었습니다.`);
            alert(`${response.data.sno} 번 학생이 성공적으로 등록되었습니다.`);
            setStudent({
                s_name: "",
                s_birthday: "",
                s_email: "",
                s_phone: "",
                s_status: "",
                s_address1: "",
                s_address2: ""
            });
        })
        .catch(error => {
            console.error('학생 등록 중 오류가 발생했습니다: ', error);
            // alert('학생 등록 중 오류가 발생했습니다.');
        });
    };


    return(
        <div>
            <h1>학생 등록 페이지</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input type="text" name="s_name" value={student.s_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>생년월일:</label>
                    <input type="date" name="s_birthday" value={student.s_birthday} onChange={handleChange} required />
                </div>
                <div>
                    <label>메일:</label>
                    <input type="email" name="s_email" value={student.s_email} onChange={handleChange} required />
                </div>
                <div>
                    <label>전화번호:</label>
                    <input type="text" name="s_phone" value={student.s_phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>상태:</label>
                    <input type="text" name="s_status" value={student.s_status} onChange={handleChange} required />
                </div>
                <div>
                    <label>주소 1:</label>
                    <input type="text" name="s_address1" value={student.s_address1} onChange={handleChange} required />
                </div>
                <div>
                    <label>주소 2:</label>
                    <input type="text" name="s_address2" value={student.s_address2} onChange={handleChange} required />
                </div>

                <button type="submit">등록</button>
            </form>

        </div>
    );
};

export default StudentRegister;
