import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"

const ReferenceModify = () => {
    const { rno } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [reference, setReference] = useState({
        r_title: "",
        r_content: "",
        writer: localStorage.getItem('m_name') || "",
    })
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
        const response = await (await axios.get(`http://localhost:8092/reference/read?rno=${rno}`)).data;
        console.log(response)
        console.log(response.references_resource)
        setReference(response);
        setReferenceResource(response.references_resource);
        setLoading(false);

    };

    const deleteSubmit = async (rrno) => {
        if(window.confirm('삭제하시겠습니까?')) {
            try{
                await axios.delete('http://localhost:8092/reference/files/'+rrno);
                // navigate('/Noticelist')
                setReferenceResource(referenceResource.filter(reference =>reference.rrno !==  rrno))
            } catch(error) {
                console.error("파일을 삭제하는 중 오류가 발생했습니다.")
            }
        }
    }

    useEffect(() => {
        getReference();
    }, []);

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

            const response = await axios.put(`http://localhost:8092/reference/${rno}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(result => {
                if (result.status === 200) {
                    alert("공지사항 등록이 성공적으로 완료되었습니다." + reference.writer);
                    navigate("/referencelist");
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
        <div className="container">
            <div className="row">
                <h2>수정중</h2>
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
                {referenceResource.map((rr, index) => (
                            <div>
                            <p key={rr.rrno}>{rr.rr_name}</p>
                            <button type="button" onClick={()=>{deleteSubmit(rr.rrno)}}>삭제</button>
                            </div>
                        ))}
            </div>
        </div>
    )

};
export default ReferenceModify;