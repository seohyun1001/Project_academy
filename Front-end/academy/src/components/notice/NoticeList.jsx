import axios from "axios";
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Noticelist(){
    const [noticeList, setNoticeList] = useState([]);

    const uploadNotice = async () => {
        const result = await axios.get("http://localhost:8092/notice/list")
        console.log(result)
        console.log(result.data)
        setNoticeList(result.data);
        
    };
    // const deleteNotice = async (nno) =>{
    //     if(window.confirm(`${nno}번의 게시물을 삭제하시겠습니까?`)){
    //         await axios.delete(`http://localhost:8092/notice/${nno}`);
    //         uploadNotice();
    //     }
    // };
    useEffect(() =>{
        uploadNotice();
        console.log(noticeList)
    },[]);

    return(
        <div className="container">
            <table className="talbe border shadow my-4">
                <thead>
                    <tr>
                        <th scope="col">제목</th>
                        <th scope="col">내용</th>
                        <th scope="col">작성자</th>
                    </tr>
                </thead>
                {noticeList.map((notice,  index) =>( 
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {/* <td>{noticelist.nno}</td> */}
                        <td>{notice.n_title}</td>
                        <td>{notice.writer}</td>
                    </tr>

                ))}
            </table>
            <Link className="btn btn-primary my-2" to={'/noticeregister'}>
                        작성
                    </Link>
        </div>
    );
}
export default Noticelist;