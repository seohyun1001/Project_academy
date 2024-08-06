import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LatestRefs = () => {
    const [latestRefs, setLatestRefs] = useState([]);

    useEffect(() => {
        const fetchLatestRefs = async () => {
            try {
                const response = await axios.get('http://localhost:8092/reference/latest');
                setLatestRefs(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching latest Refs:', error);

            }
        };

        fetchLatestRefs();
    }, []);

    return (
        <div>
            <h2>Latest Refs</h2>
            <ul>
                {latestRefs.map(reference => (
                    <li key={reference.id}>
                        <h5>{reference.r_title}</h5>
                        {/* <p>{reference.content}</p> */}
                        {/* <p>{new Date(reference.regDate).toLocaleDateString()}</p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestRefs;
