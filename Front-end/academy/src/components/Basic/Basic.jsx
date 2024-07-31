import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import MainInfo from "./MainInfo";
import RelatedClasses from "./RelatedClasses";
import Counseling from "./Counseling";
import Footer from "./Footer";

const Basic = () => {
    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <div class="d-flex flex-wrap">
                    <SideBar />
                    <div class="col">
                        <MainInfo />
                        <RelatedClasses />
                        <Counseling />
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}

export default Basic;