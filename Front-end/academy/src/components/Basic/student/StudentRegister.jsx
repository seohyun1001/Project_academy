import React, { useState } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import './StudentRegister.css';


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

    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();


    // handleChange 함수는 입력 필드에서 사용자가 값을 입력할 때마다 호출되어 입력된 값을 상태에 업데이트 함
    const handleChange = (e) => {  // 'e'는 이벤트 객체를 나타냄

        const { name, value } = e.target;  // 'e.target'은 이벤트가 발생한 요소를 나타냄
        //  name과 value는 각각 입력 필드의 'name' 속성과 현재 입력된 값

        setStudent(prevState => ({  // 'prevState'는 상태 업데이트 함수에 전달되는 콜백 함수의 인자(이전 상태)
            ...prevState,  // 이전 상태를 복사함
            [name]: value
        }));
    };

    // 이미지 파일 변경 핸들러
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };


    // 목록 페이지
    const handleList = () => {
        navigate('/student');
    }

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentResponse = await axios.post('http://localhost:8092/student/register', student);
            const sno = studentResponse.data;  // 응답에서 sno를 추출해야함






            if (profileImage) {
                const formData = new FormData();
                formData.append('file', profileImage);

                await axios.post(`http://localhost:8092/student/uploadProfileImage/${sno}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            alert(`${sno} 번 학생이 성공적으로 등록되었습니다.`);
            // alert(`${response.data.sno} 번 학생이 성공적으로 등록되었습니다.`); -> response.data.sno를 찾지 못함

            setStudent({
                s_name: "",
                s_birthday: "",
                s_email: "",
                s_phone: "",
                s_status: "",
                s_address1: "",
                s_address2: ""
            });
            setProfileImage(null);
            navigate('/student'); // 학생 추가 후 리스트 페이지 이동
        }
        catch (error) {
            console.error('학생 등록 중 오류가 발생했습니다: ', error);
            alert('학생 등록 중 오류가 발생했습니다.');
        };
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">학생 등록 페이지</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>이름:</label>
                                    <input
                                        type="text"
                                        name="s_name"
                                        value={student.s_name}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>프로필 이미지:</label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>생년월일:</label>
                                    <input
                                        type="date"
                                        name="s_birthday"
                                        value={student.s_birthday}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>메일:</label>
                                    <input
                                        type="email"
                                        name="s_email"
                                        value={student.s_email}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>전화번호:</label>
                                    <input
                                        type="text"
                                        name="s_phone"
                                        value={student.s_phone}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>상태:</label>
                                    <select
                                        name="s_status"
                                        value={student.s_status}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">상태를 선택하세요</option>
                                        <option value="수강">수강</option>
                                        <option value="수료">수료</option>
                                        <option value="퇴소">퇴소</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>주소 1:</label>
                                    <input
                                        type="text"
                                        name="s_address1"
                                        value={student.s_address1}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>주소 2:</label>
                                    <input
                                        type="text"
                                        name="s_address2"
                                        value={student.s_address2}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">등록</button>
                                <button type="button" className="btn btn-secondary btn-block" onClick={handleList}>목록</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRegister;
