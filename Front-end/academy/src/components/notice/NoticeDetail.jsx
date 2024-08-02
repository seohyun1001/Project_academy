import React, { useEffect, useState, } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoticeModify from "./NoticeModify";

const NoticeDetail = ({ nno, setShowDetail }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState({});
  const [noticeResource, setNoticeResource] = useState([]);
  const [showModify, setShowModify] = useState(false);

  const getNotice = async () => {
    const response = await (await axios.get(`http://localhost:8092/notice/read?nno=${nno}`)).data;
    console.log(response)
    console.log(response.notice_resource)
    setNotice(response);
    setNoticeResource(response.notice_resource);
    setLoading(false);
  };

  const handleModify = () => {
    setShowModify(true); // 수정 시 수정 컴포넌트를 보여주도록 설정
  }

  const handleDelete = async () => {
    if (window.confirm(`${notice.nno}번의 공지사항을 삭제 하시겠습니까?`))
      try {
        await axios.delete(`http://localhost:8092/notice/${nno}`)
        console.log(`${notice.nno} 공지사항 삭제 완료`);
        alert(`${notice.nno}가 삭제되었습니다.`);
        setShowDetail(false);
      } catch (error) {
        console.log('삭제 중 오류가 발생하였습니다.', error);
        alert('삭제중 오류가 발생했습니다.')
      };
  };

  useEffect(() => {
    getNotice();
  }, [nno]);

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
    <>
      {loading ? (
        <p>Loading...</p>
      ) : showModify ? (
        <NoticeModify nno={nno} setShowModify={setShowModify} />
      ) : (
        <>
          <h2 class="notice">공지사항</h2>
          <div class="container">
            <div className="d-flex flex-wrap justify-content-between">
              <span className="notice_title">{notice.n_title}</span>
              <span>작성자 : {notice.writer}</span>
            </div>
            <span> 등록일 : {formatDate(notice.regDate)} </span>
            <pre className="notice_content">{notice.n_content}</pre>
            {noticeResource.map((nr, index) => (
              <p key={index}>
                <a href={'http://localhost:8092/file/' + nr.nr_name}>{nr.nr_name}</a>
              </p>
            ))}
          </div>


          <div class="d-flex flex-wrap justify-content-between btns">
            <button
              className="btn btn-outline-dark noticeListBtn"
              onClick={() => setShowDetail(false)}>
              목록으로 돌아가기
            </button>
            <div class="">
              <button className="btn btn-outline-primary noticeModifyBtn" onClick={handleModify}>수정</button>
              <button className="btn btn-outline-danger noticeRemoveBtn" onClick={handleDelete}>삭제</button>
            </div>
          </div>
        </>
      )}
    </>

  );
};

export default NoticeDetail;
