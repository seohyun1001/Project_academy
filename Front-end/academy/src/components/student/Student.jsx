import React, { useState } from "react";
import StudentList from "./StudentList";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";
import StudentInfo from "./StudentInfo";
import StudentDetail from "./StudentDetail";

const Student = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleStudentClick = (student) => {
        if (selectedStudent && selectedStudent.sno === student.sno) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(student);
        }
    };

    const handleStudentDeleted = () => {
        setSelectedStudent(null);
        window.location.reload();
    };

    return (
        <div className="vsc-initialized">
            <Header />
            <div className="container">
                <div className="d-flex flex-wrap">
                    <StudentList onStudentClick={handleStudentClick} />
                    <div className="col">
                        {selectedStudent ? (
                            <StudentDetail student={selectedStudent} onStudentDeleted={handleStudentDeleted} />
                        ) : (
                            <StudentInfo />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Student;