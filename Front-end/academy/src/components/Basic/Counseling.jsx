import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Modal from "react-modal";
import CounselingRegister from '../counseling/CounselingRegister';
import CounselingEdit from '../counseling/CounselingEdit';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        maxHeight: '80%',
        overflowY: 'auto'
    }
};

const Counseling = ({ sno }) => {
    const [counselingList, setCounselingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cache, setCache] = useState({});
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCounseling, setSelectedCounseling] = useState(null);

    useEffect(() => {
        const fetchCounselingData = async () => {
            setLoading(true);
            setError(null);

            if (cache[sno]) {
                setCounselingList(cache[sno]);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/counseling/student/${sno}`);
                setCounselingList(response.data);
                setCache(prevCache => ({ ...prevCache, [sno]: response.data }));
            } catch (error) {
                console.error('상담 데이터를 가져오는 중 오류 발생:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounselingData();
    }, [sno, cache]);

    const handleEditClick = (cno) => {
        setSelectedCounseling(cno);
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
                            <h4>상담 이력</h4>
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
                        <h4>상담 이력</h4>
                        <button
                            style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                            onClick={() => setIsRegisterModalOpen(true)}
                        >
                            등록
                        </button>
                        {counselingList.length === 0 ? (
                            <div><h5>상담 이력이 존재하지 않습니다.</h5></div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '10px', textAlign: 'left' }}>상담내용</th>
                                        <th style={{ padding: '10px', textAlign: 'right' }}>상담일자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {counselingList.map(counseling => (
                                        <tr key={counseling.cno} onClick={() => handleEditClick(counseling.cno)}>
                                            <td style={{ padding: '10px', textAlign: 'left' }}>{counseling.c_content}</td>
                                            <td style={{ padding: '10px', textAlign: 'right' }}>{new Date(counseling.regdate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        );
    }, [loading, error, counselingList]);


    return (
        <>
            {renderedContent}
            <Modal
                isOpen={isRegisterModalOpen}
                onRequestClose={() => setIsRegisterModalOpen(false)}
                style={customStyles}
                contentLabel="Counseling Register"
                ariaHideApp={false}
            >
                <CounselingRegister onClose={() => {
                    setIsRegisterModalOpen(false);
                    window.location.reload(); // 모달 닫은 후 새로고침
                }} />
            </Modal>
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                style={customStyles}
                contentLabel="Counseling Edit"
                ariaHideApp={false}
            >
                {selectedCounseling && <CounselingEdit cno={selectedCounseling} onClose={() => {
                    setIsEditModalOpen(false);
                    window.location.reload(); // 모달 닫은 후 새로고침
                }} />}
            </Modal>
        </>
    );
}

export default Counseling;
