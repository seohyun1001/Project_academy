import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReferenceModify = ({ rno, setShowModify, setShowDetail }) => {

  const [loading, setLoading] = useState(true);
  const [reference, setReference] = useState({
    r_title: "",
    r_content: "",
    writer: localStorage.getItem('m_name') || "",
    regDate: ""
  });
  const [referenceResource, setReferenceResource] = useState([]);
  const [rr_name, setRrName] = useState(null);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "rr_name") {
      setRrName(files[0]);
    } else {
      setReference({
        ...reference,
        [name]: value,
      });
    }
  };

  const getReference = async () => {
    try {
      const response = await axios.get(`http://localhost:8092/reference/read?rno=${rno}`);
      setReference(response.data);
      setReferenceResource(response.data.references_resource);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reference data:", error);
    }
  };

  const deleteSubmit = async (rrno) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await axios.delete('http://localhost:8092/reference/files/' + rrno);
        setReferenceResource(referenceResource.filter(reference => reference.rrno !== rrno));
      } catch (error) {
        console.error("파일을 삭제하는 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    getReference();
  }, [rno]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("r_title", reference.r_title);
      formData.append("r_content", reference.r_content);
      formData.append("writer", reference.writer);

      if (rr_name) {
        formData.append("files", rr_name);
      }

      const response = await axios.put(`http://localhost:8092/reference/${rno}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(result => {
        if (result.status === 200) {
          alert("공지사항 수정이 성공적으로 완료되었습니다.");
          setShowModify(false);
          setShowDetail(true);
        }
      }).catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.error("등록 중 오류가 발생했습니다.", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
    <h2 className="notice">수정중</h2>
    <form onSubmit={(e) => e.preventDefault()}>
        <div className="container">
            <div className="d-flex flex-wrap justify-content-between">
                <p className="d-flex notice_title">제목:
                    <input
                        onChange={onInputChange}
                        type="text"
                        name="r_title"
                        className="form-control"
                        value={reference.r_title}
                        required
                        placeholder="제목"
                    />
                </p>
                <span>작성자 : {reference.writer}</span>

            </div>
            <p className="notice_content" >내용
                <textarea
                    onChange={onInputChange}
                    id="r_content"
                    className="form-control"
                    placeholder="내용"
                    name="r_content"
                    value={reference.r_content}
                    rows="20"
                />
            </p>
            <div>
            </div>
            <p>첨부파일</p>
            <input
                onChange={onInputChange}
                type="file"
                id="rr_name"
                className="form-control"
                name="rr_name"
            />
            {referenceResource.map((rr) => (
                <div key={rr.rrno}>
                    <p>{rr.rr_name} <button type="button" onClick={() => deleteSubmit(rr.rrno)}>X</button></p>
                </div>
            ))}
        </div>
        <div className="d-flex flex-wrap justify-content-between btns">
            <button class="btn btn-outline-dark noticeListBtn" onClick={() => setShowModify(false)}>수정 취소</button>
            <div>
                <button type="button" className="btn btn-outline-primary px-3 mx-2" onClick={onSubmit}>수정</button>
            </div>
        </div>
    </form>
</>
  );
};

export default ReferenceModify;
