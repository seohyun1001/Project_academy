import React from "react";

const NoticeList = () => {
    return (
        <>
            <div class="container notice_con">
                <h2 class="notice_title">공지사항</h2>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                        <tr scope="row">
                            <td>1</td>
                            <td>제목</td>
                            <td>2024-07-25</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item"><a class="page-link" href="#">이전</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">다음</a></li>
                </ul>
            </nav>
        </>
    )
}

export default NoticeList;