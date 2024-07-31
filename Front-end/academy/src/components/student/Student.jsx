import React, { useState } from "react";
import StudentList from "./StudentList";
import Header from "../Basic/Header"
import Footer from "../Basic/Footer";
import MainInfo from "../Basic/MainInfo";
import RelatedClasses from "../Basic/RelatedClasses";
import Counseling from "../Basic/Counseling";
import StudentInfo from "./StudentInfo";
import StudentDetail from "./StudentDetail"

const Student = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };

    const handleStudentDeleted = () => {
        setSelectedStudent(null);
        
    };

    return (
        <div class="vsc-initialized">
            <Header />
            <div class="container">
                <div class="d-flex flex-wrap">
                <StudentList onStudentClick={handleStudentClick} />
                    <div class="col">
                    {selectedStudent ? (
                            <StudentDetail student={selectedStudent} onStudentDeleted={handleStudentDeleted} />
                        ) : (
                            <StudentInfo />
                        )}
                        <RelatedClasses />
                        <Counseling />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Student;