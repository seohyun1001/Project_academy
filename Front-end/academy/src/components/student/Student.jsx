import React, { useState } from "react";
import StudentList from "./StudentList";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";
import StudentInfo from "./StudentInfo";
import StudentDetail from "./StudentDetail";
import StudentRegister from "./StudentRegister";
import StudentEdit from "./StudentEdit"; // Import StudentEdit component

const Student = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [showEdit, setShowEdit] = useState(false); // New state for showing StudentEdit

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

    const handleRegisterClick = () => {
        setShowRegister(prevState => !prevState);
        if (selectedStudent) {
            setSelectedStudent(null);
        }
        setShowEdit(false); // Hide StudentEdit when showing StudentRegister
    };

    const handleEditClick = () => {
        setShowEdit(prevState => !prevState);
        if (selectedStudent) {
            setShowRegister(false); // Hide StudentRegister when showing StudentEdit
        }
    };

    return (
        <div className="vsc-initialized">
            <Header />
            <div className="container">
                <div className="d-flex flex-wrap">
                    <StudentList onStudentClick={handleStudentClick} onRegisterClick={handleRegisterClick} />
                    <div className="col">
                        {showRegister ? (
                            <StudentRegister />
                        ) : showEdit ? (
                            selectedStudent ? <StudentEdit /> : <StudentInfo />
                        ) : selectedStudent ? (
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