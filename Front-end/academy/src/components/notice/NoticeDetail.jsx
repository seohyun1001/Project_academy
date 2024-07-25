import React, { useEffect, useState, useSyncExternalStore } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NoticeDetail = () => {
  const { nno } = useParams();
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState({});
  const [noticeResource, setNoticeResource] = useState([]);
  const getNotice = async () =>{
    const response = await (await axios.get(`http://localhost:8092/notice/read?nno=${nno}`)).data;
    console.log(response)
    console.log(response.notice_resource)
    setNotice(response);
    setNoticeResource(response.notice_resource);
    setLoading(false);
    
  };
  useEffect(() =>{
    getNotice();
  },[]);
  

  return (
    <div>
      <h2>{notice.n_title}</h2>
      <p>{notice.n_content}</p>
      <p>작성자: {notice.writer}</p>
      {noticeResource.map((nr,index) => (
        <p key={index}><a href={'http://localhost:8092/file/'+nr.nr_name}>{nr.nr_name}</a></p>
      ))}
      
    </div>
  );
};

export default NoticeDetail;
