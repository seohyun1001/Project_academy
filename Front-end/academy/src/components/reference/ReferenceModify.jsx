import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import './Reference.css';

const ReferenceModify = () => {
    const { rno } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reference, setReference] = useState({
        r_title: "",
        r_content: "",
        writer: localStorage.getItem('m_name') || "",
        regDate: ""  // regDate 추가
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
            console.log(response.data);  // 응답 확인
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

    useEffect(() => {
        getReference();
    }, []);

    const onSubmit = async () => {  // 수정: 폼 제출 시 사용될 함수
        try {
            const formData = new FormData();
            formData.append("r_title", reference.r_title);
            formData.append("r_content", reference.r_content);
            formData.append("writer", reference.writer);
            console.log(formData);

            if (rr_name) {
                formData.append("files", rr_name);
            }

            const response = await axios.put(`http://localhost:8092/reference/${rno}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("공지사항 수정이 성공적으로 완료되었습니다.");
                navigate("/referencelist");
            }
        } catch (error) {
            console.error("수정 중 오류가 발생했습니다.", error);
            alert("수정 중 오류가 발생했습니다.");
        }
    };
    
    
    return (
        <body>
            <Header />
            <div className="container notice_con">
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
                            {/* <span>등록일 : {reference.regDate ? for matDate(reference.regDate) : 'Date not available'}</span> */}
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
                    <Link class="btn btn-outline-dark noticeListBtn" to='/referencelist'>목록으로 돌아가기</Link>
                        <div>
                        <button type="button" className="btn btn-outline-primary px-3 mx-2" onClick={onSubmit}>수정</button>
                        </div>
                    </div>
                </form>
            </div>
        </body>
    );
};

export default ReferenceModify;
