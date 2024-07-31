import React from "react";

const MainInfo = () => {
    return(
        <div class="card profile_card">
          <div class="d-flex flex-wrap main_info">
            <img class="img-thumbnail picture float-start"></img>
            <div class="d-flex flex-column info_list">
              <div class="input-group">
                <label for="" class="form-label info_detail">이름</label>
                <p type="text" name="" id="" >홍길동</p>
              </div>

              <div class="input-group">
                <label for="" class="form-label info_detail">학생번호</label>
                <p type="text" name="" id="">2407001</p>
              </div>

              <div class="input-group">
                <label for="" class="form-label info_detail">전화번호</label>
                <p type="text" name="" id="">01043218765</p>
              </div>

              <div class="input-group">
                <label for="" class="form-label info_detail">주소1</label>
                <p type="text" name="" id="">부산</p>
              </div>

              <div class="input-group">
                <label for="" class="form-label info_detail">주소2</label>
                <p type="text" name="" id="">연제구</p>
              </div>

              <div class="input-group">
                <label for="" class="form-label info_detail">현재 상태</label>
                <p type="text" name="" id="">이수중</p>
              </div>
            </div>
          </div>
        </div>
    )
}

export default MainInfo;
