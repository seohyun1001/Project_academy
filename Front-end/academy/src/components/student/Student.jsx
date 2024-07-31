import React from "react";
import StudentList from "./StudentList";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";
import MainInfo from "../Basic/MainInfo";
import RelatedClasses from "../Basic/RelatedClasses";
import Counseling from "../Basic/Counseling";


const Student = () => {
    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <div class="d-flex flex-wrap">
                    <StudentList />
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

export default Student;