import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { classRoomcontext } from "../../Providers/AuthContext";



const ClassDetails = () => {
    const { classid } = useParams();

    const {user} = useContext(classRoomcontext)
    console.log(classid);


    return (
        <div className="flex gap-6 p-6">
        
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Class assignment</h2>

                    <div className="card-actions justify-end mt-4">
                        <Link to={`/dashbord/postAssignment/${classid}`} > <button className="btn btn-primary">Create</button></Link>


                    </div>
                </div>
            </div>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Evaluate Assignment</h2>

                    <div className="card-actions justify-end mt-4">
                        <Link to={`/dashbord/evaluateAssignment/${user.email}`} > <button className="btn btn-primary">Evaluate</button></Link>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;