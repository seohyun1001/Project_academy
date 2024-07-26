import Counseling from "../Basic/Counseling";
import Footer from "../Basic/Footer";
import Header from "../Basic/Header";
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
                    <div class="col">
                        <MainInfo />
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}

export default Lecture;