import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Referencelist() {
  const [referenceList, setReferenceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const uploadRegister = async () => {
    try {
      const result = await axios.get("http://localhost:8092/reference/list");
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
    setCurrentItems(filteredList.slice(indexOfFirstItem, indexOfLastItem));
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
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return (
      <div>
        {startPage > 1 && <button onClick={() => handleClick(startPage - 1)}>◀</button>}
        {pageNumbers}
        {endPage < totalPages && <button onClick={() => handleClick(endPage + 1)}>▶</button>}
      </div>
    );
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-2"
      />
      <table className="table border shadow my-4">
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
              <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
              <td>
                <Link to={`/Reference/${reference.rno}`}>
                  {reference.r_title}
                </Link>
              </td>
              <td>{reference.regdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{renderPageNumbers()}</div>
      <Link class="btn btn-outline-dark registerBtn" to={'/referenceregister'}>등록</Link>
    </div>
  );
}

export default Referencelist;
