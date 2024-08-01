import React, { useState, useEffect } from "react";
import axios from "axios";

const RelatedClasses = ({ sno }) => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8092/pay/student/${sno}`)
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, [sno]);

    return (
        <div className="card profile_card">
            <div className="d-flex flex-wrap main_info">
                <div className="d-flex flex-column class_list">
                    <h4>수강 이력</h4>
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
                </div>
            </div>
        </div>
    );
}

export default RelatedClasses;
