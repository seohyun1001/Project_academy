import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CounselingList = () => {
    const [counselings, setCounselings] = useState([]); // 다수의 상담 정보
    const [selectedCounseling, setSelectedCounseling] = useState(null); // 선택된 상담 정보
    const navigate = useNavigate();

    const fetchCounselings = () => {
        axios.get('/counseling')
            .then(response => setCounselings(response.data))
            .catch(error => console.error('상담을 불러오는 중에 오류가 발생했습니다.', error));
    };

    useEffect(() => {
        fetchCounselings();
    }, []);

    const handleCounselingClick = (cno) => {
        if (selectedCounseling && selectedCounseling.cno === cno) {
            setSelectedCounseling(null); // 이미 선택된 상담을 다시 클릭하면 상세 정보 숨기기
        } else {
            axios.get(`/counseling/${cno}`)
                .then(response => setSelectedCounseling(response.data))
                .catch(error => console.error('상담 상세 정보를 불러오는 중에 다음과 같은 오류가 발생했습니다: ', error));
        }
    };

    const handleEditClick = () => {
        navigate(`/counseling/edit/${selectedCounseling.cno}`);
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 이 결제를 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/counseling/${selectedCounseling.cno}`);
                alert('삭제 성공');
                setSelectedCounseling(null);
                fetchCounselings();
            } catch (error) {
                console.error('결제 삭제 중 오류가 발생했습니다.', error);
                alert('결제 삭제 중 오류가 발생했습니다.');
            }
        }
    };


    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h1>상담 목록</h1>
                <table>
                    <thead>
                        <tr>
                            <th>상담 번호</th>
                            <th>강의 번호</th>
                            <th>강의 이름</th>
                            <th>학생 번호</th>
                            <th>학생 이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {counselings.map(counseling => (
                            <tr key={counseling.cno}>
                                <td>
                                    <button
                                        onClick={() => handleCounselingClick(counseling.cno)}
                                        style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                    >
                                        {counseling.cno}
                                    </button>
                                </td>
                                <td>{counseling.lno}</td>
                                <td>{counseling.l_name}</td>
                                <td>{counseling.sno}</td>
                                <td>{counseling.s_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ flex: 2 }}>
                {selectedCounseling && (
                    <div>
                        <h2>상담 상세 정보</h2>
                        <p>상담 번호: {selectedCounseling.cno}</p>
                        <p>상담 내용: {selectedCounseling.c_content}</p>
                        <p>강의 번호: {selectedCounseling.lno}</p>
                        <p>강의 이름: {selectedCounseling.l_name}</p>
                        <p>학생 번호: {selectedCounseling.sno}</p>
                        <p>학생 이름: {selectedCounseling.s_name}</p>
                        <button onClick={handleEditClick}>수정</button>
                        <button onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CounselingList;
