import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import Header from "../Header";

const NoticeModify = ({ nno, setShowModify, setShowDetail }) => {
    const [loading, setLoading] = useState(true)
    const [notice, setNotice] = useState({
        n_title: "",
        n_content: "",
        writer: localStorage.getItem('m_name') || "",
    })
    const [noticeResource, setNoticeResource] = useState([]);
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

    const getNotice = async () => {
        const response = await (await axios.get(`http://localhost:8092/notice/read?nno=${nno}`)).data;
        console.log(response)
        console.log(response.notice_resource)
        setNotice(response);
        setNoticeResource(response.notice_resource);
        setLoading(false);

    };

    const deleteSubmit = async (nrno) => {
        if (window.confirm('삭제하시겠습니까?')) {
            try {
                await axios.delete('http://localhost:8092/notice/files/' + nrno);

                setNoticeResource(noticeResource.filter(notice => notice.nrno !== nrno))
            } catch (error) {
                console.error("파일을 삭제하는 중 오류가 발생했습니다.")
            }
        }
    }

    useEffect(() => {
        getNotice();
    }, [nno]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("n_title", notice.n_title);
            formData.append("n_content", notice.n_content);
            formData.append("writer", notice.writer);
            console.log(formData)

            if (nr_name) {
                formData.append("files", nr_name);
            }

            const response = await axios.put(`http://localhost:8092/notice/${nno}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(result => {
                if (result.status === 200) {
                    alert("공지사항 등록이 성공적으로 완료되었습니다." + notice.writer);
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
                                name="n_title"
                                className="form-control"
                                value={notice.n_title}
                                required
                                placeholder="제목"
                            />
                        </p>
                        <span>작성자 : {notice.writer}</span>

                    </div>
                    <p className="notice_content" >내용
                        <textarea
                            onChange={onInputChange}
                            id="n_content"
                            className="form-control"
                            placeholder="내용"
                            name="n_content"
                            value={notice.n_content}
                            rows="20"
                        />
                    </p>
                    <div>
                    </div>
                    <p>첨부파일</p>
                    <input
                        onChange={onInputChange}
                        type="file"
                        id="nr_name"
                        className="form-control"
                        name="nr_name"
                    />
                    {noticeResource.map((nr) => (
                        <div key={nr.nrno}>
                            <p>{nr.nr_name} <button type="button" onClick={() => deleteSubmit(nr.nrno)}>X</button></p>
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
    )

};
export default NoticeModify;