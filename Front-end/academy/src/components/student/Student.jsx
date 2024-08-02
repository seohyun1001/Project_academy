import React, { useState } from "react";
import StudentList from "./StudentList";

import StudentInfo from "./StudentInfo";
import StudentDetail from "./StudentDetail";
import StudentRegister from "./StudentRegister";
import StudentEdit from "./StudentEdit";
const Student = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleStudentClick = (student) => {
        if (selectedStudent && selectedStudent.sno === student.sno) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(student);
        }
        setShowEdit(false);
    };

    const handleStudentDeleted = () => {
        setSelectedStudent(null);
        window.location.reload();
    };

    const handleRegisterClick = () => {
        setShowRegister(prevState => !prevState);
        setSelectedStudent(null);
        setShowEdit(false);
    };

    const handleEditClick = () => {
        setShowEdit(true);
        setShowRegister(false);
    }

    return (
        <>
            <StudentList onStudentClick={handleStudentClick} onRegisterClick={handleRegisterClick} />
            <div className="col">
                {showRegister ? (
                    <StudentRegister />
                ) : showEdit ? (
                    <StudentEdit sno={selectedStudent.sno} />
                ) : selectedStudent ? (
                    <StudentDetail student={selectedStudent} onStudentDeleted={handleStudentDeleted} onEditClick={handleEditClick} />
                ) : (
                    <StudentInfo />
                )}
            </div>
        </>
    );
};

export default Student;
