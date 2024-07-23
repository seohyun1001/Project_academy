import axios from "axios";
import React, { useEffect, useState } from "react";


function Noticelist() {
    const [list, setList] = useState([]);

    const uploadNotice = async () => {
        const result = await axios.get("http://localhost:8092/notice/list")
        console.log(result)
        setList(result.data);
    };
    // const deleteNotice = async (nno) =>{
    //     if(window.confirm(`${nno}번의 게시물을 삭제하시겠습니까?`)){
    //         await axios.delete(`http://localhost:8092/notice/${nno}`);
    //         uploadNotice();
    //     }
    // };
    useEffect(() => {
        uploadNotice();
    }, []);

    return (
        <div className="container">
            <table className="talbe border shadow my-4">
                <thead>
                    <tr>
                        <th scope="col">@</th>
                        <th scope="col">제목</th>
                        <th scope="col">내용</th>
                        {/* <th scope="col">첨부파일</th>
                        <th scope="col"> </th>
                        <th scope="col">@</th>
                        <th scope="col">@</th> */}
                    </tr>
                </thead>
                {list.map((lists, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {/* <td>{list.nno}</td> */}
                        <td>{lists.n_title}</td>
                        <td>{lists.writer}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
export default Noticelist;