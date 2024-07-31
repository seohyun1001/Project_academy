import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Counseling = ({ sno }) => {
    const [counselingList, setCounselingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounselingData = async () => {
            try {
                const response = await axios.get(`/counseling/student/${sno}`);
                setCounselingList(response.data);
            } catch (error) {
                console.error('상담 데이터를 가져오는 중 오류 발생:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounselingData();
    }, [sno]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred: {error.message}</div>;
    }

    if (!Array.isArray(counselingList)) {
        return <div>Invalid data format</div>;
    }

    return (
        <div className="card profile_card">
            <div className="d-flex flex-wrap main_info">
                <div className="d-flex flex-column class_list">
                    <h4>상담 이력</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>상담내용</th>
                                <th>상담일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {counselingList.map(counseling => (
                                <tr key={counseling.cno}>
                                    <td>{counseling.c_content}</td>
                                    <td>{new Date(counseling.regdate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Counseling;
