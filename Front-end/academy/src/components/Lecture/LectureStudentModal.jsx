import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LectureStudentModal = ({ show, handleClose, student }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>학생 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap main_info">
                    <div>
                        {student.s_profileImage ?
                            <img
                                className="img-thumbnail picture float-start"
                                src={student.s_profileImage} alt="프로필 사진" />
                            :
                            <img
                                className="img-thumbnail picture float-start"
                                src="/student/images/basicimg.png" alt="프로필 사진" />
                        }
                    </div>
                    <div className="d-flex flex-column info_list">
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">이름</label>
                            <p>{student.s_name}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">생일</label>
                            <p>{student.s_birthday}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">이메일</label>
                            <p>{student.s_email}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">전화번호</label>
                            <p>{student.s_phone}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">주소1</label>
                            <p>{student.s_address1}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="" className="form-label info_detail">주소2</label>
                            <p>{student.s_address2}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LectureStudentModal;