
import { Link } from "react-router-dom";
import teacher from "../../public/assests/teacher/teacher.jpg"
const JoinTeacher = () => {
    return (
        <div style={{ backgroundColor: 'rgb(34, 21, 59)' }}>
            <div className="hero p-8 ">
                
                <div className="hero-content flex-col gap-6 lg:flex-row">
                    <img src={teacher} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold text-purple-800">Join as a Teacher !</h1>
                        <p className="py-6 text-white">Empower minds, shape futures. Join as a teacher and be the catalyst for change. Together, lets create an inspiring learning environment where every lesson shapes a brighter tomorrow.</p>
                       <Link to="/techon"> <button className="btn bg-slate-200 text-purple-800">Start Teaching Today</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinTeacher;