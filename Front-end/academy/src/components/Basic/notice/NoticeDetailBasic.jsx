import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import NoticeDetail from "./NoticeDetail";

const NoticeDetailBasic = () => {
    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <NoticeDetail />
            </div>
            <Footer />
        </body>
    )
}

export default NoticeDetailBasic;