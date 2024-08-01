import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import './StudentRegister.css';
import { Modal, Button, Form } from 'react-bootstrap';


const RegisterModal = () => {
    const [show, setShow] = useState(false);
    const [student, setStudent] = useState({
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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


    const handleList = () => {
        navigate('/student');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentResponse = await axios.post('http://localhost:8092/student/register', student);
            const sno = studentResponse.data;

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
            navigate('/student');
        }
        catch (error) {
            console.error('학생 등록 중 오류가 발생했습니다: ', error);
            alert('학생 등록 중 오류가 발생했습니다.');
        };

        handleClose();
    };


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                추가
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>학생 등록 페이지</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>이름:</Form.Label>
                            <Form.Control
                                type="text"
                                name="s_name"
                                value={student.s_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>프로필 이미지:</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>생년월일:</Form.Label>
                            <Form.Control
                                type="date"
                                name="s_birthday"
                                value={student.s_birthday}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>메일:</Form.Label>
                            <Form.Control
                                type="email"
                                name="s_email"
                                value={student.s_email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>전화번호:</Form.Label>
                            <Form.Control
                                type="text"
                                name="s_phone"
                                value={student.s_phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상태:</Form.Label>
                            <Form.Control
                                as="select"
                                name="s_status"
                                value={student.s_status}
                                onChange={handleChange}
                                required
                            >
                                <option value="">상태를 선택하세요</option>
                                <option value="수강">수강</option>
                                <option value="수료">수료</option>
                                <option value="퇴소">퇴소</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>주소 1:</Form.Label>
                            <Form.Control
                                type="text"
                                name="s_address1"
                                value={student.s_address1}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>주소 2:</Form.Label>
                            <Form.Control
                                type="text"
                                name="s_address2"
                                value={student.s_address2}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="btn-block">등록</Button>
                        <Button variant="secondary" className="btn-block" onClick={handleList}>목록</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

        // <div className="container mt-5">
        //     <div className="row justify-content-center">
        //         <div className="col-md-8">
        //             <div className="card">
        //                 <div className="card-header">
        //                     <h3 className="text-center">학생 등록 페이지</h3>
        //                 </div>
        //                 <div className="card-body">
        //                     <form onSubmit={handleSubmit}>
        //                         <div className="form-group">
        //                             <label>이름:</label>
        //                             <input
        //                                 type="text"
        //                                 name="s_name"
        //                                 value={student.s_name}
        //                                 onChange={handleChange}
        //                                 className="form-control"
        //                                 required
        //                             />
        //                         </div>
        //                         <div className="form-group">
        //                             <label>프로필 이미지:</label>
        //                             <input
        //                                 type="file"
        //                                 onChange={handleImageChange}
        //                                 className="form-control"
        //                                 required
        //                             />
        //                         </div>
        //                         <div className="form-group">
        //                             <label>생년월일:</label>
        //                             <input
        //                                 type="date"
        //                                 name="s_birthday"
        //                                 value={student.s_birthday}
        //                                 onChange={handleChange}
        //                                 className="form-control"
        //                                 required
        //                             />
        //                         </div>
        //                         <div className="form-group">
        //                             <label>메일:</label>
        //                             <input
        //                                 type="email"
        //                                 name="s_email"
        //                                 value={student.s_email}
        //                                 onChange={handleChange}
        //                                 className="form-control"
        //                                 required
        //                             />
        //                         </div>
        //                         <div className="form-group">
        //                             <label>전화번호:</label>
        //                             <input
        //                                 type="text"
        //                                 name="s_phone"
        //                                 value={student.s_phone}
        //                                 onChange={handleChange}
        //                                 className="form-control"
        //                                 required
        //                             />
        //                         </div>
        //                         <div className="form-group">
        //                             <label>상태:</label>
        //                             <select
        //                                 name="s_status"
        //                                 value={student.s_status}
        //                                 onChange={handleChange}
        //                                 className="form-control"
        //                                 required
        //                             >
        //                                 <option value="">상태를 선택하세요</option>
        //                                 <option value="수강">수강</option>
        //                                 <option value="수료">수료</option>
        //                                 <option value="퇴소">퇴소</option>
        //                             </select>
        //                         </div>
        //                         <div className="form-group">
        //                             <label>주소 1:</label>
        //                             <input
        //                                 type="text"
        //                                 name="s_address1"
        //                                 value={student.s_address1}
        //                                 onChange={handleChange}
        //                                 className="form-control"
        //                                 required
        //                             />
        //                         </div>
        //                         <div className="form-group">
        //                             <label>주소 2:</label>
        //                             <input
        //                                 type="text"
        //                                 name="s_address2"
        //                                 value={student.s_address2}
        //                                 onChange={handleChange}
        //                                 className="form-control"
        //                                 required
        //                             />
        //                         </div>
        //                         <button type="submit" className="btn btn-primary btn-block">등록</button>
        //                         <button type="button" className="btn btn-secondary btn-block" onClick={handleList}>목록</button>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default RegisterModal;
