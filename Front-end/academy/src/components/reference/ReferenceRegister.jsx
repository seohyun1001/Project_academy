import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReferenceRegister = () => {
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
                    alert("공지사항 등록이 성공적으로 완료되었습니다." + reference.writer);
                    navigate("/Referencelist");
                }
            });
        } catch (error) {
        
            console.error("등록 중 오류가 발생했습니다.", error);
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <h2>자료실</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <input
                            onChange={onInputChange}
                            type="text"
                            name="r_title"
                            value={reference.r_title}
                            required
                            placeholder="제목"
                        />
                        <input
                            onChange={onInputChange}
                            type="text"
                            id="r_content"
                            className="form-control"
                            placeholder="내용"
                            name="r_content"
                            value={reference.r_content}
                        />

                        <input
                            onChange={onInputChange}
                            type="file"
                            id="rr_name"
                            className="form-control"
                            name="rr_name"
                            // accept=".pdf,.doc,.docx"
                        />
                        <input 
                        onChange={onInputChange}
                        type="hidden"
                        id="writer"
                        className="form-control"
                        name="writer"
                        value={reference.writer}
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

export default ReferenceRegister;
