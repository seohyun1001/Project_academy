import Counseling from "../Counseling";
import Footer from "../Footer";
import Header from "../Header";
import MainInfo from "../MainInfo";
import RelatedClasses from "../RelatedClasses";
import LectureList from "../../Lecture/LectureList";
import LectureInfo from "./LectureInfo";
import LectureProfile from "./LectureProfile";
import LectureInfoRegister from "./LectureInfoRegister";



const LectureBasic = () => {
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

export default LectureBasic;