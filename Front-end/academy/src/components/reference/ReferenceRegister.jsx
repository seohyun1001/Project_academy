import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";

const TestRegister = () => {
    const navigate = useNavigate();
    const [reference, setReference] = useState({
        r_title: "",
        r_content: "",
        writer: localStorage.getItem('m_name') || "",
    });
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

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("r_title", reference.r_title);
            formData.append("r_content", reference.r_content);
            formData.append("writer", reference.writer);
            console.log(formData)

            if (rr_name) {
                formData.append("files", rr_name);
            }

            const response = await axios.post("/reference/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(result => {
                if (result.status === 201) {
                    alert("공지사항 등록이 성공적으로 완료되었습니다.");
                    navigate("/Referencelist");
                }
            });
        } catch (error) {

            console.error("등록 중 오류가 발생했습니다.", error);
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <body>
            <Header />
            <div class="container notice_con">
                <h2 class="notice">자료실</h2>
                <form onSubmit={onSubmit}>
                    <div class="container">
                        <div class="d-flex flex-wrap justify-content-between">
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
                        <p class="notice_content">내용
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
                        <a>첨부파일</a>
                        <input
                            onChange={onInputChange}
                            type="file"
                            id="rr_name"
                            className="form-control"
                            name="rr_name"
                        />
                    </div>
                    <div class="d-flex flex-wrap justify-content-between btns">
                    <Link class="btn btn-outline-dark noticeListBtn" to='/referencelist'>목록으로 돌아가기</Link>
                        <div class="">
                            <button type="submit" className="btn btn-outline-primary px-3 mx-2">
                                등록
                            </button>

                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </body>
    );
};

export default TestRegister;
