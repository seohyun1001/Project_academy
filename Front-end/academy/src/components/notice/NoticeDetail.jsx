import React, { useEffect, useState, useSyncExternalStore } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Noticelist from "./NoticeList";

const NoticeDetail = () => {
  const navigate = useNavigate();
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

  const handleModify = () =>{
    navigate(`/notice/modify/${notice.nno}`)
  }
  
  const handleDelete = async () =>{
    if(window.confirm(`${notice.nno} 공지사항을 삭제 하시겠습니까?`))
      try{
        await axios.delete(`http://localhost:8092/notice/${nno}`)
        console.log(`${notice.nno} 공지사항 삭제 완료`);
        alert(`${notice.nno}가 삭제되었습니다.`);
        navigate('/noticelist');
    }catch(error){
      console.log('삭제 중 오류가 발생하였습니다.', error);
      alert('삭제중 오류가 발생했습니다.')
    };
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
      <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
      <button className="btn btn-primary" onClick={handleModify}>수정</button>
    </div>
  );
};

export default NoticeDetail;
