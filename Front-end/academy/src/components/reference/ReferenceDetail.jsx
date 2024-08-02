import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const ReferenceDetail = () => {
  const navigate = useNavigate();
  const { rno } = useParams();
  const [loading, setLoading] = useState(true)
  const [reference, setReference] = useState({});
  const [referenceResource, setReferenceResource] = useState([]);
  const getReference = async () => {
    const response = await (await axios.get(`http://localhost:8092/reference/read?rno=${rno}`)).data;
    console.log(response)
    console.log(response.references_resource)
    setReference(response);
    setReferenceResource(response.references_resource);
    setLoading(false);

  };

  const handleList = () => {
    navigate(`/ReferenceList`)
  }
  const handleModify = () => {
    navigate(`/reference/modify/${reference.rno}`)
  }

  const handleDelete = async () => {
    if (window.confirm(`${reference.rno}번의 공지사항을 삭제 하시겠습니까?`))
      try {
        await axios.delete(`http://localhost:8092/reference/${rno}`)
        console.log(`${reference.rno} 공지사항 삭제 완료`);
        alert(`${reference.rno}가 삭제되었습니다.`);
        navigate('/referencelist');
      } catch (error) {
        console.log('삭제 중 오류가 발생하였습니다.', error);
        alert('삭제중 오류가 발생했습니다.')
      };
  };

  useEffect(() => {
    getReference();
  }, []);

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
            <span class="notice_title">{reference.r_title}</span>
            <span>작성자 :  {reference.writer} </span>
          </div>
          <span> 등록일 :{formatDate(reference.regDate)} </span>
          <pre class="notice_content">{reference.r_content}</pre>
          {referenceResource.map((rr, index) => (
            <p key={index}><a href={'http://localhost:8092/file/' + rr.rr_name}>{rr.rr_name}</a></p>
          ))}
        </div>
        <div class="d-flex flex-wrap justify-content-between btns">
          <Link class="btn btn-outline-dark noticeListBtn" to='/referencelist'>목록으로 돌아가기</Link>
          <div class="">
            <button className="btn btn-outline-primary noticeModifyBtn" onClick={handleModify}>수정</button>
            <button className="btn btn-outline-danger noticeRemoveBtn" onClick={handleDelete}>삭제</button>
          </div>
        </div>
      </div>
      <Footer />
    </body>
  );
};

export default ReferenceDetail;
