import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoticeRegister = () => {
    const navigate = useNavigate();
    const [notice, setNotice] = useState({
        n_title: "",
        n_content: "",
    });
    const [nr_name, setNrName] = useState(null);

    const onInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "nr_name") {
            setNrName(files[0]);
        } else {
            setNotice({
                ...notice,
                [name]: value,
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("n_title", notice.n_title);
            formData.append("n_content", notice.n_content);
            
            if (nr_name) {
                formData.append("nr_name", nr_name, nr_name.name);
            }

            const response = await axios.post("/notice/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                alert("공지사항 등록이 성공적으로 완료되었습니다.");
                navigate("/Noticelist");
            }
        } catch (error) {
            console.error("등록 중 오류가 발생했습니다.", error);
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <h2>공지사항</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <input
                            onChange={onInputChange}
                            type="text"
                            name="n_title"
                            value={notice.n_title}
                            required
                            placeholder="제목"
                        />
                        <input
                            onChange={onInputChange}
                            type="text"
                            id="n_content"
                            className="form-control"
                            placeholder="내용"
                            name="n_content"
                            value={notice.n_content}
                        />

                        <input
                            onChange={onInputChange}
                            type="file"
                            id="nr_name"
                            className="form-control"
                            name="nr_name"
                            accept=".pdf,.doc,.docx"
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-primary px-3 mx-2">
                        등록
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NoticeRegister;
