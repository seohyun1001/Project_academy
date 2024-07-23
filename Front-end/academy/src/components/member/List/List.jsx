import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:8092/member/list');
                setMembers(response.data);
            } catch (error) {
                console.error('강사 정보를 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div>
            <h2>강사 리스트</h2>
            <table>
                <thead>
                    <tr>
                        <th>강사번호</th>
                        <th>강사이름</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>주소1</th>
                        <th>주소2</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.mno}>
                            <td>{member.mno}</td>
                            <td>{member.m_name}</td>
                            <td>{member.m_email}</td>
                            <td>{member.m_phone}</td>
                            <td>{member.m_address1}</td>
                            <td>{member.m_address2}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;