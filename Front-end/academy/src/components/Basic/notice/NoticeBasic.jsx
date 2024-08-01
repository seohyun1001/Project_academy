import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import NoticeListSample from "./NoticeListSample";

const NoticeBasic = () => {
    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <NoticeListSample />
            </div>
            <Footer />
        </body>
    )
}

export default NoticeBasic;