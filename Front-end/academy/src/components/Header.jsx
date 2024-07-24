import React from "react";

const Header = () => {
    


    return (
        <>
            <div class="p-3 text-bg-dark">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" class="nav-link px-2 text-white home_link">Home</a></li>
                        </ul>

                        <div class="text-end">
                            <button type="button" class="btn btn-outline-light me-2 loginBtn">회원정보 들어갈거임</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container con_menubar">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li class="nav-item">
                            <a class="nav-link active nav_link" aria-current="page" href="#">학생</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active nav_link" aria-current="page" href="#">강사</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active nav_link" aria-current="page" href="#">강의</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active nav_link" aria-current="page" href="#">공지사항</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active nav_link nav_link_last" aria-current="page" href="#">자료실</a>
                        </li>



                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Header;