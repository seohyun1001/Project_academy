import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayList = () => {
    const [pays, setPays] = useState([]); // 다수의 결제 정보
    const [selectedPay, setSelectedPay] = useState(null); // 선택된 결제 정보
    const navigate = useNavigate();

    const fetchPays = () => {
        axios.get('/pay')
            .then(response => setPays(response.data))
            .catch(error => console.error('결제를 불러오는 중에 오류가 발생했습니다.', error));
    };

    useEffect(() => {
        fetchPays();
    }, []);

    const handleRegister = () => {
        navigate('/pay/register');
    };

    const handlePayClick = (pno) => {
        if (selectedPay && selectedPay.pno === pno) {
            setSelectedPay(null); // 이미 선택된 결제를 다시 클릭하면 상세 정보 숨기기
        } else {
            axios.get(`/pay/${pno}`)
                .then(response => setSelectedPay(response.data))
                .catch(error => console.error('결제 상세 정보를 불러오는 중에 다음과 같은 오류가 발생했습니다: ', error));
        }
    };

    const handleEdit = () => {
        navigate(`/pay/edit/${selectedPay.pno}`);
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 이 결제를 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8092/pay/${selectedPay.pno}`);
                alert('삭제 성공');
                setSelectedPay(null);
                fetchPays();
            } catch (error) {
                console.error('결제 삭제 중 오류가 발생했습니다.', error);
                alert('결제 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h1>결제 목록</h1>
                <button className="btn btn-primary" onClick={handleRegister}>추가</button>
                <table>
                    <thead>
                        <tr>
                            <th>결제 번호</th>
                            <th>강의 번호</th>
                            <th>강의 이름</th>
                            <th>학생 번호</th>
                            <th>학생 이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pays.map(pay => (
                            <tr key={pay.pno}>
                                <td>
                                    <button
                                        onClick={() => handlePayClick(pay.pno)}
                                        style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                    >
                                        {pay.pno}
                                    </button>
                                </td>
                                <td>{pay.lno}</td>
                                <td>{pay.l_name}</td>
                                <td>{pay.sno}</td>
                                <td>{pay.s_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ flex: 2 }}>
                {selectedPay && (
                    <div>
                        <h2>결제 상세 정보</h2>
                        <p>결제 번호: {selectedPay.pno}</p>
                        <p>결제 여부: {selectedPay.paid ? 'Yes' : 'No'}</p>
                        <p>강의 번호: {selectedPay.lno}</p>
                        <p>강의 이름: {selectedPay.l_name}</p>
                        <p>학생 번호: {selectedPay.sno}</p>
                        <p>학생 이름: {selectedPay.s_name}</p>
                        <button onClick={handleEdit}>수정</button>
                        <button onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PayList;
