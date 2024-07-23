import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const NoticeRegister = () => {
    const navigate = useNavigate();
    const [notice, setNotice] = useState({
        n_title: "",
        n_content: "",
    });
    const [notice_resource, setNotice_resource] = useState({
        nr_name: "",
    })
    const onInputChange = (e) => {
        const {name, value} = e.target
        setNotice({
            ...notice,
            [name]: value,
        });
        setNotice_resource({
            ...notice_resource,
            [name]: value,
        })
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/notice/register', notice, notice_resource);
            if (response.status === 201) {
                alert('공지사항 등록이 성공적으로 완료되었습니다.');
                navigate('/Noticelist');
            }
        } catch (error) {
            console.error('등록 중 오류가 발생했습니다.', error);
            alert(' 등록 중 오류가 발생했습니다.');
        }
        // await axios.post("http://localhost:8092/notice/register", notice, notice_resource)
    }
    return (
        <div className="container">
            <div className="row">
                <h2> 공지사항 </h2>
                <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <input
                        onChange={onInputChange}
                        type="text"
                        name="n_title"
                        value={notice.n_title}
                        required
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
                        value={notice.nr_name}
                    />
                    </div>
                    <button
                  type="submit"
                  className="btn btn-outline-primary px-3 mx-2"
                >
                  등록
                </button>
                </form>
            </div>
        </div>
    )
}

export default NoticeRegister;