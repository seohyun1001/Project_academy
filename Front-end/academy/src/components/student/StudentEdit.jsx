import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Await, useNavigate, useParams } from 'react-router-dom';


const StudentEdit = ({sno}) => {
    // const { sno } = useParams(); // URL 파라미터로부터 sno 추출
    const [student, setStudent] = useState({
        s_name: "",
        s_birthday: "",
        s_email: "",
        s_phone: "",
        s_status: "",
        s_address1: "",
        s_address2: "",
        s_profileImage: ""
    });

    const [profileImage, setProfileImage] = useState(null);
    // const navigate = useNavigate();

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

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8092/student/${sno}`, student);

            // 프로필 이미지가 있으면 업로드
            if (profileImage) {
                const formData = new FormData();
                formData.append('file', profileImage);

                // 이미지 업로드 요청 (await 사용)
                await axios.post(`http://localhost:8092/student/uploadProfileImage/${sno}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            alert('학생 정보가 성공적으로 수정되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error('학생 정보 수정 중 오류가 발생했습니다: ', error);
            alert('학생 정보 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="card profile_card">
            <div className="d-flex flex-wrap main_info">
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column info_list">
                        <div className="form-group mb-2 d-flex align-items-center" style={{ marginLeft: '-19px' }}>
                            <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right', marginTop: '10px' }}>이름</label>
                            <div className="d-flex flex-grow-1 align-items-center">
                                <input
                                    type="text"
                                    name="s_name"
                                    value={student.s_name}
                                    onChange={handleChange}
                                    required
                                    className="me-2"
                                />
                            </div>
                        </div>
                        <div className="form-group mb-2 d-flex flex-column align-items-center" style={{ marginLeft: '20px', marginBottom: '1rem' }}>
                            {student.s_profileImage ? (
                                <img src={student.s_profileImage} alt="Profile" width="150" height="150" />
                            ) : (
                                <img src="/student/images/basicimg.png" alt="Default Profile" width="150" height="150" />
                            )}
                            <div className="d-flex align-items-center mt-2">
                                <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right', whiteSpace: 'nowrap', marginTop: '10px' }}>프로필 이미지</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="form-control me-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right' }}>생년월일</label>
                        <input
                            type="date"
                            name="s_birthday"
                            value={student.s_birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right' }}>메일</label>
                        <input
                            type="email"
                            name="s_email"
                            value={student.s_email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right' }}>전화번호</label>
                        <input
                            type="text"
                            name="s_phone"
                            value={student.s_phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right' }}>상태</label>
                        <select
                            name="s_status"
                            value={student.s_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">상태를 선택하세요</option>
                            <option value="수강">수강</option>
                            <option value="수료">수료</option>
                            <option value="퇴소">퇴소</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right' }}>주소 1</label>
                        <input
                            type="text"
                            name="s_address1"
                            value={student.s_address1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label info_detail me-3" style={{ minWidth: '80px', textAlign: 'right' }}>주소 2</label>
                        <input
                            type="text"
                            name="s_address2"
                            value={student.s_address2}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                            <div className="btn-group mt-3">
                                <button type="submit" className="btn btn-outline-primary">수정</button>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.reload()}>취소</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentEdit;