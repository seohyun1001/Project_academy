import Footer from "../Basic/Footer";
import Header from "../Basic/Header";
import List from "./List/List";
import Read from "./Read/Read";

const Member = () => {

    return (
        <body class="vsc-initialized">
            <Header />
            <div class="container">
                <div class="d-flex flex-wrap">
                    <List />
                    <div class="col">
                        <Read />
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}
export default Member;