const NoticeDetail = () => {
    return (
        <div class="container notice_con">
            <h2 class="notice">공지사항</h2>
            <div class="container">
                <div class="d-flex flex-wrap justify-content-between">
                    <span class="notice_title">제목</span>
                    <span>작성자 : </span>
                </div>
                <span>등록일 : </span>
                <p class="notice_content">내용</p>
                <a>첨부파일</a>
            </div>
            <div class="d-flex flex-wrap justify-content-between btns">
                <button class="btn btn-outline-dark noticeListBtn">목록으로 돌아가기</button>
                <div class="">
                    <button class="btn btn-outline-primary noticeModifyBtn">수정</button>
                    <button class="btn btn-outline-danger noticeRemoveBtn">삭제</button>
                </div>
            </div>
        </div>
    )
}

export default NoticeDetail;