import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ReferenceDetail = () => {
  const navigate = useNavigate();
  const { rno } = useParams();
  const [loading, setLoading] = useState(true)
  const [reference, setReference] = useState({});
  const [referenceResource, setReferenceResource] = useState([]);
  const getReference = async () =>{
    const response = await (await axios.get(`http://localhost:8092/reference/read?rno=${rno}`)).data;
    console.log(response)
    console.log(response.references_resource)
    setReference(response);
    setReferenceResource(response.references_resource);
    setLoading(false);

  };

  const handleModify = () =>{
    navigate(`/reference/modify/${reference.rno}`)
  }
  
  const handleDelete = async () =>{
    if(window.confirm(`${reference.rno} 공지사항을 삭제 하시겠습니까?`))
      try{
        await axios.delete(`http://localhost:8092/reference/${rno}`)
        console.log(`${reference.rno} 공지사항 삭제 완료`);
        alert(`${reference.rno}가 삭제되었습니다.`);
        navigate('/referencelist');
    }catch(error){
      console.log('삭제 중 오류가 발생하였습니다.', error);
      alert('삭제중 오류가 발생했습니다.')
    };
  };
  
  useEffect(() =>{
    getReference();
  },[]);
  

  return (
    <div>
      <h2>{reference.r_title}</h2>
      <p>{reference.r_content}</p>
      <p>작성자: {reference.writer}</p>
      {referenceResource.map((rr,index) => (
        <p key={index}><a href={'http://localhost:8092/file/'+rr.rr_name}>{rr.rr_name}</a></p>
      ))}
      <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
      <button className="btn btn-primary" onClick={handleModify}>수정</button>
    </div>
  );
};

export default ReferenceDetail;