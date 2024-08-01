import Counseling from "../Basic/Counseling";
import Footer from "../Footer";
import Header from "../Header";
import MainInfo from "../Basic/MainInfo";
import RelatedClasses from "../Basic/RelatedClasses";
import LectureList from "./LectureList";


const Lecture = () => {
    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <div class="d-flex flex-wrap">
                    <LectureList />
                </div>
            </div>
            <Footer />
        </body>
    )
}

export default Lecture;