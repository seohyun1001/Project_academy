import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReferenceRegister from "./ReferenceRegister";
import ReferenceDetail from "./ReferenceDetail";

function Referencelist() {
  const [referenceList, setReferenceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedReference, setSelectedReference] = useState(null);

  const uploadRegister = async () => {
    try {
      const result = await axios.get("http://localhost:8092/reference/list");
      console.log(result.data);
      setReferenceList(result.data);
    } catch (error) {
      console.error("Error fetching reference list:", error);
    }
  };

  useEffect(() => {
    uploadRegister();
  }, []);

  useEffect(() => {
    const filteredList = referenceList.filter(reference =>
      reference.r_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 최신 글부터 표시하기 위해 reverse() 사용
    setCurrentItems(filteredList.slice(indexOfFirstItem, indexOfLastItem).reverse());
  }, [currentPage, itemsPerPage, referenceList, searchTerm]);

  const totalPages = Math.ceil(
    referenceList.filter(reference =>
      reference.r_title.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );

  const maxPageNumbers = 5;

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
        >
          <a
            className="page-link"
            onClick={() => handleClick(i)}
            style={{ cursor: 'pointer' }}
          >
            {i}
          </a>
        </li>
      );
    }

    return (
      <ul className="pagination mb-0">
        {startPage > 1 && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => handleClick(startPage - 1)}
              style={{ cursor: 'pointer' }}
            >
              &laquo;
            </a>
          </li>
        )}
        {pageNumbers}
        {endPage < totalPages && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => handleClick(endPage + 1)}
              style={{ cursor: 'pointer' }}
            >
              &raquo;
            </a>
          </li>
        )}
      </ul>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) {
      return 'Date not available';
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateStr}`);
      return 'Invalid Date';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 포맷
    const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 포맷
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 검색어를 상태에 저장
    setSearchTerm(document.getElementById('searchInput').value);
  };
  const handleRegisterClick = () =>{
    setShowRegister(true);
  };
  const handleReferenceClick = (rno) =>{
    setSelectedReference(rno);
    setShowDetail(true);
  }

  return (
    <div className="container notice_con">
      {showRegister ? (
        <ReferenceRegister/>
      ) : showDetail ?(
        <ReferenceDetail rno={selectedReference} setShowDetail={setShowDetail}/>
      ) : (
        <>
          <div className="d-flex justify-content-between mb-4">
            <h2 className="notice_title" style={{ fontSize: "30px" }}>자료실</h2>
            <div className="d-flex">
              <input
                id="searchInput"
                className="form-control me-2"
                type="text"
                placeholder="검색..."
              />
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={handleSearch} // 검색 버튼 클릭 시 handleSearch 호출
              >
                Search
              </button>
            </div>
          </div>

          <table className="table table-hover border shadow-sm mb-4">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">등록일</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((reference, index) => (
                <tr key={index}>
                  <th scope="row">{reference.rno}</th>
                  <td onClick={() => handleReferenceClick(reference.rno)} style={{ cursor: 'pointer' }}>
                  {reference.r_title}
                  </td>
                  <td>{formatDate(reference.regDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="mx-auto"> {/* 페이지 번호를 가운데로 정렬 */}
              {renderPageNumbers()}
            </div>
            <div className="text-end">
              <button
                type="button"
                className="btn btn-outline-dark noticeRegisterBtn"
                onClick={handleRegisterClick} // 등록 버튼 클릭 시 handleRegisterClick 호출
              >
                등록
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Referencelist;
