import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentRegister.css';

const StudentEdit = () => {
    const { sno } = useParams(); // URL 파라미터로부터 sno 추출
    const [student, setStudent] = useState({
        s_name: "",
        s_birthday: "",
        s_email: "",
        s_phone: "",
        s_status: "",
        s_address1: "",
        s_address2: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8092/student/${sno}`)
            .then(response => setStudent(response.data))
            .catch(error => console.error('학생 정보를 불러오는 중에 오류가 발생했습니다: ', error));
    }, [sno]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8092/student/${sno}`, student)
            .then(() => {
                alert('학생 정보가 성공적으로 수정되었습니다.');
                navigate('/student');
            })
            .catch(error => {
                console.error('학생 정보 수정 중 오류가 발생했습니다: ', error);
                alert('학생 정보 수정 중 오류가 발생했습니다.');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">학생 정보 수정</h3>
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
                                <button type="submit" className="btn btn-primary btn-block">수정</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentEdit;