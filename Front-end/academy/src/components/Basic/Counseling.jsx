import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const Counseling = ({ sno }) => {
    const [counselingList, setCounselingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cache, setCache] = useState({});

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
                        {counselingList.length === 0 ? (
                            <div><h5>상담 이력이 존재하지 않습니다.</h5></div>
                        ) : (
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
                        )}
                    </div>
                </div>
            </div>
        );
    }, [loading, error, counselingList]);

    return renderedContent;
}

export default Counseling;
