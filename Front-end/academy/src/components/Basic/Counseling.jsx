import React from "react";

const Counseling = () => {
    return(
        <div class="card profile_card">
          <div class="d-flex flex-wrap main_info">

            <div class="d-flex flex-column class_list">
              <h4>상담 이력</h4>
              <table>
                <thead>
                  <tr>
                    <th>상담내용</th>
                    <th>상담일자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DB01</td>
                    <td>2024-07-23</td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
    )
}

export default Counseling;