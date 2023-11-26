
import errorpages from "../../public/assests/error/Feb-Business_9.jpg";
import { Link } from "react-router-dom";
const Errorpages = () => {
    return (
        <div>
            <div className=" flex   justify-center ">
            <img  width={500} src={errorpages}></img>
           
            </div>
           <div>
           <p className="text-red-500 font-bold text-4xl">An error has been Occured</p>
            <Link to ="/">
                <button className="btn mt-6 bg-gradient-to-r from-cyan-500 to-blue-500">Go To HomePage</button>
            </Link>
           </div>
        </div>
        
    );
};

export default Errorpages;