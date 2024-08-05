import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PayRegister from "../pay/PayRegister";
import PayEdit from "../pay/PayEdit";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%', // 원하는 너비로 설정
        maxHeight: '80%', // 최대 높이 설정
        overflowY: 'auto' // 내용이 넘칠 경우 스크롤
    }
};

const RelatedClasses = ({ sno }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cache, setCache] = useState({});
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPay, setSelectedPay] = useState(null);
    const [studentInfo, setStudentInfo] = useState({ sno: '', s_name: '' });

    useEffect(() => {
        const fetchClassData = async () => {
            setLoading(true);
            setError(null);

            if (cache[sno]) {
                setClasses(cache[sno]);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8092/pay/student/${sno}`);
                setClasses(response.data);
                setCache(prevCache => ({ ...prevCache, [sno]: response.data }));
                // 학생 정보 가져오기
                const studentResponse = await axios.get(`/student/${sno}`);
                setStudentInfo({ sno: studentResponse.data.sno, s_name: studentResponse.data.s_name });
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassData();
    }, [sno, cache]);

    const handleEditClick = (pno) => {
        setSelectedPay(pno);
        setIsEditModalOpen(true);
    };

    const renderedContent = useMemo(() => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            console.error('Error occurred:', error);
            return (
                <div className="card profile_card">
                    <div className="d-flex flex-wrap main_info">
                        <div className="d-flex flex-column class_list">
                            <h4>수강 이력</h4>
                            <div>Error occurred while fetching data.</div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="card profile_card">
                <div className="d-flex flex-wrap main_info">
                    <div className="d-flex flex-column class_list">
                        <h4>수강 이력</h4>
                        <button
                            style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                            onClick={() => setIsRegisterModalOpen(true)}
                        >
                            등록
                        </button>
                        {classes.length === 0 ? (
                            <div><h5>수강 이력이 존재하지 않습니다.</h5></div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>강의 코드</th>
                                        <th>강의명</th>
                                        <th>등록일자</th>
                                        <th>수납여부</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((cls) => (
                                        <tr key={cls.pno} onClick={() => handleEditClick(cls.pno)}>
                                            <td><a>{cls.lno}</a></td>
                                            <td>{cls.l_name}</td>
                                            <td>{new Date(cls.regdate).toLocaleDateString()}</td>
                                            <td>{cls.paid ? "수납 완료" : "미수납"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        );
    }, [loading, error, classes]);

    return (
        <>
            {renderedContent}
            <Modal
                isOpen={isRegisterModalOpen}
                onRequestClose={() => setIsRegisterModalOpen(false)}
                style={customStyles}
                contentLabel="Pay Register"
                ariaHideApp={false}
            >
                <PayRegister
                    sno={studentInfo.sno}
                    s_name={studentInfo.s_name}
                    onClose={() => setIsRegisterModalOpen(false)}
                />
            </Modal>
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                style={customStyles}
                contentLabel="Pay Edit"
                ariaHideApp={false}
            >
                {selectedPay && <PayEdit pno={selectedPay} onClose={() => setIsEditModalOpen(false)} />}
            </Modal>
        </>
    );
}

export default RelatedClasses;
