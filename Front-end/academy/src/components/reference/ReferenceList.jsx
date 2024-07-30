import axios from "axios";
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Referencelist(){
    const [referenceList, setReferenceList] = useState([]);

    const uploadRegister = async () => {
        const result = await axios.get("http://localhost:8092/reference/list")
        console.log(result)
        console.log(result.data)
        setReferenceList(result.data);
        
    };
    useEffect(() =>{
        uploadRegister();
        console.log(referenceList)
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
                {referenceList.map((reference,  index) =>( 
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <Link to={`/Reference/${reference.rno}`}>
                        <td>{reference.r_title}</td>
                        </Link>
                        <td>{reference.writer}</td>
                    </tr>

                ))}
            </table>
            <Link className="btn btn-primary my-2" to={'/referenceregister'}>
                        작성
                    </Link>
        </div>
    );
}
export default Referencelist;