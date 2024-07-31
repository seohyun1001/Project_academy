import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Noticelist() {
  const [noticeList, setNoticeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const uploadRegister = async () => {
    try {
      const result = await axios.get("http://localhost:8092/notice/list");
      setNoticeList(result.data);
    } catch (error) {
      console.error("Error fetching notice list:", error);
    }
  };

  useEffect(() => {
    uploadRegister();
  }, []);

  useEffect(() => {
    const filteredList = noticeList.filter(notice =>
        notice.n_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(filteredList.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, noticeList, searchTerm]);

  const totalPages = Math.ceil(
    noticeList.filter(notice =>
        notice.n_title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th scope="col">작성자</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((notice, index) => (
            <tr key={index}>
              <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
              <td>
                <Link to={`/notice/${notice.nno}`}>
                  {notice.n_title}
                </Link>
              </td>
              <td>{notice.writer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{renderPageNumbers()}</div>
      <Link className="btn btn-primary my-2" to={'/noticeregister'}>
        작성
      </Link>
    </div>
  );
}

export default Noticelist;
