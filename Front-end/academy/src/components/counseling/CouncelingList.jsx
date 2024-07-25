import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CounselingList = () => {
    const [counselings, setCounselings] = useState([]);

    useEffect(() => {
        const fetchCounselings = async () => {
            try {
                const response = await axios.get('/counseling');
                setCounselings(response.data);
            } catch (error) {
                console.error('Failed to fetch counselings', error);
            }
        };

        fetchCounselings();
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h2>상담 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>상담 번호</th>
                            <th>상담 내용</th>
                            <th>강의 번호</th>
                            <th>강의 이름</th>
                            <th>학생 번호</th>
                            <th>학생 이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {counselings.map(counseling => (
                            <tr key={counseling.cno}>
                                <td>{counseling.cno}</td>
                                <td>{counseling.c_content}</td>
                                <td>{counseling.lno}</td>
                                <td>{counseling.l_name}</td>
                                <td>{counseling.sno}</td>
                                <td>{counseling.s_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CounselingList;
