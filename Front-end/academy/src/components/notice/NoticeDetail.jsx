import React, { useEffect, useState, useSyncExternalStore } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";

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

  const handleList = () => {
    navigate(`/NoticeList`)
  }

  const handleModify = () =>{
    navigate(`/notice/modify/${notice.nno}`)
  }
  
  const handleDelete = async () =>{
    if(window.confirm(`${notice.nno}번의 공지사항을 삭제 하시겠습니까?`))
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
  const formatDate = (dateStr) => {
    if (!dateStr) {
      return 'Date not available';
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateStr}`);
      return 'Invalid Date';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 포맷
    const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 포맷
    return `${year}-${month}-${day}`;
  };

  return (
    <body>
      <Header />
      <div class="container notice_con">
        <h2 class="notice">자료실</h2>
        <div class="container">
          <div class="d-flex flex-wrap justify-content-between">
            <span class="notice_title">{notice.n_title}</span>
            <span>작성자 :  {notice.writer} </span>
          </div>
          <span> 등록일 :{formatDate(notice.regDate)} </span>
          <pre class="notice_content">{notice.n_content}</pre>
          {noticeResource.map((nr, index) => (
            <p key={index}><a href={'http://localhost:8092/file/' + nr.nr_name}>{nr.nr_name}</a></p>
          ))}
        </div>
        <div class="d-flex flex-wrap justify-content-between btns">
        <Link class="btn btn-outline-dark noticeListBtn" to='/noticelist'>목록으로 돌아가기</Link>
          <div class="">
            <button className="btn btn-outline-primary noticeModifyBtn" onClick={handleModify}>수정</button>
            <button className="btn btn-outline-danger noticeRemoveBtn" onClick={handleDelete}>삭제</button>
          </div>
        </div>
      </div>
      <Footer />
    </body>
    // <div>
    //   <h2>{notice.n_title}</h2>
    //   <p>{notice.n_content}</p>
    //   <p>작성자: {notice.writer}</p>
    //   {noticeResource.map((nr,index) => (
    //     <p key={index}><a href={'http://localhost:8092/file/'+nr.nr_name}>{nr.nr_name}</a></p>
    //   ))}
    //   <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
    //   <button className="btn btn-primary" onClick={handleModify}>수정</button>
    // </div>
  );
};

export default NoticeDetail;
