import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LatestNotices = () => {
    const [latestNotices, setLatestNotices] = useState([]);

    useEffect(() => {
        const fetchLatestNotices = async () => {
            try {
                const response = await axios.get('http://localhost:8092/notice/latest');
                setLatestNotices(response.data);
            } catch (error) {
                console.error('Error fetching latest notices:', error);
            }
        };

        fetchLatestNotices();
    }, []);

    return (
        <div>
            <h2>Latest Notices</h2>
            <ul>
                {latestNotices.map(notice => (
                    <li key={notice.id}>
                        <h5>{notice.n_title}</h5>
                        {/* <p>{notice.content}</p> */}
                        {/* <p>{new Date(notice.regDate).toLocaleDateString()}</p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestNotices;
