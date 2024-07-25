import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NoticeList from "./NoticeList";

const NoticeBasic = () => {
    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <NoticeList />
            </div>
            <Footer />
        </body>
    )
}

export default NoticeBasic;