import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const RelatedClasses = ({ sno }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cache, setCache] = useState({});

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
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassData();
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
                                        <tr key={cls.pno}>
                                            <td>{cls.lno}</td>
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

    return renderedContent;
}

export default RelatedClasses;
