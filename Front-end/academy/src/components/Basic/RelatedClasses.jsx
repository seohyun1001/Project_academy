import React from "react";

const RelatedClasses = () => {
    return (
        <div class="card profile_card">
            <div class="d-flex flex-wrap main_info">
                <div class="d-flex flex-column class_list">
                    <h4>수강 이력</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>강의 코드</th>
                                <th>강의명</th>
                                <th>등록일자</th>
                                <th>수납여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DB01</td>
                                <td>database</td>
                                <td>2024-07-23</td>
                                <td>수납 완료</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RelatedClasses;