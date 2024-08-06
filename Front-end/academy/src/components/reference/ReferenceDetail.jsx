import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Referencelist from "./ReferenceList";
import ReferenceModify from "./ReferenceModify";


const ReferenceDetail = ({ rno, setShowDetail }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [reference, setReference] = useState({});
  const [referenceResource, setReferenceResource] = useState([]);
  const [showModify, setShowModify] = useState(false);
  const [showList, setShowList] = useState(false);

  const getReference = async () => {
    const response = await (await axios.get(`http://localhost:8092/reference/read?rno=${rno}`)).data;
    setReference(response);
    setReferenceResource(response.references_resource);
    setLoading(false);
  };

  const handleModify = () => {
    setShowModify(true); // 2. 편집 모드 상태를 true로 설정
  };

  const handleDelete = async () => {
    if (window.confirm(`${reference.rno}번의 자료실을 삭제 하시겠습니까?`))
      try {
        await axios.delete(`http://localhost:8092/reference/${rno}`)
        console.log(`${reference.rno} 자료실 삭제 완료`);
        alert(`${reference.rno}가 삭제되었습니다.`);
        setShowList(true);
      } catch (error) {
        console.log('삭제 중 오류가 발생하였습니다.', error);
        alert('삭제중 오류가 발생했습니다.')
      };
  };

  useEffect(() => {
    getReference();
  }, [rno, showModify]);

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
      ) : showList ? (
        <Referencelist />
      ) : showModify ? (
        <ReferenceModify rno={rno} setShowModify={setShowModify} setShowDetail={() => setShowList(false)} /> // setShowModify, setShowDetail prop 추가
      ) : (
        <>
          <h2 class="notice">자료실</h2>
          <div class="container">
            <div className="form-control">
              <div className="d-flex flex-wrap justify-content-between">
                <span className="notice_title">{reference.r_title}</span>
                <span>작성자 : {reference.writer}</span>
              </div>
            </div>
            <div className="form-control">
              <span> 등록일 : {formatDate(reference.regDate)} </span>
            </div>
            <div className="form-control">

              <pre className="notice_content">{reference.r_content}</pre>
            </div>
            <div className="form-control">

              {referenceResource.map((rr, index) => (
                <p key={index}>
                  <a href={'http://localhost:8092/file/' + rr.rr_name}>{rr.rr_name}</a>
                </p>
              ))}
            </div>
          </div>


          <div class="d-flex flex-wrap justify-content-between btns">
            <button
              className="btn btn-outline-dark noticeListBtn"
              onClick={() => setShowList(true)}>
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

export default ReferenceDetail;
