import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NoticeDetail = () => {

    const { nno } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchNotice = async () => {
        try {
          const response = await axios.get(`http://localhost:8092/notice/read`);
          setNotice(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching notice:', error);
          setLoading(false);
        }
      };
  
      if (nno) {
        fetchNotice();
      }
    }, [nno]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!notice) {
      return <div>Notice not found</div>;
    }
  
    return (
      <div>
        123
        <h2>{notice.n_title}</h2>
        <p>{notice.content}</p>
        <p>작성자: {notice.writer}</p>
      </div>
    );
  };
  
export default NoticeDetail;