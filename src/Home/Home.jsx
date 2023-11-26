import Bannar from "../Bannar/Bannar";
import HighlighClasses from "../HighlightClasses/HighlighClasses";
import JoinTeacher from "../JoinTeacher/JoinTeacher";
import Partners from "../Partners/Partners";
import TotalUSer from "../TotalUsers/TotalUSer";



const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <Partners></Partners>
            {/* <HighlighClasses></HighlighClasses>
            <TotalUSer></TotalUSer> */}
            <JoinTeacher></JoinTeacher>
        </div>
    );
};

export default Home;