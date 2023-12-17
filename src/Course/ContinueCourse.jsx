import { useQuery } from "@tanstack/react-query";
import { Link, NavLink, useParams } from "react-router-dom";
import usePublicApi from "../Hooks/usePublicApi";
import { useContext } from "react";
import { classRoomcontext } from "../Providers/AuthContext";


const ContinueCourse = () => {
    const { id } = useParams()
    const publicApi = usePublicApi()
    const{user} = useContext(classRoomcontext)
    const { data: classAssignments = [], refetch } = useQuery({
        queryKey: ["enrollClass"],
        
        queryFn: async () => {
            const res = await publicApi.get(`/student/continueCourse/${id}`)
            return res.data;
        }
    })
    return (
        <div style={{ backgroundColor: 'rgb(34, 51, 59)' }}>
            <div className="py-14 flex">
                <div className="w-1/4  items-center justify-center flex flex-col space-y-4 mr-4">
                    <button className="btn w-full">Class</button>
                    <button className="btn  w-full">Assignments</button>
                    <Link to = {`/dashbord/getAssignmentMark/${user.email}`}><button className="btn  w-full">Marks</button></Link>
                   
                </div>
                <div className="w-3/4 border-l-4 border-indigo-500 grid grid-cols-2">
                    {
                        classAssignments.map(ca => <div key={ca._id} className="card w-96 bg-base-100 shadow-xl ml-10 mt-16">
                            <div className="card-body">
                                <h2 className="card-title font-bold">{ca.title}</h2>
                                <h2 className="card-title ">
                                    <div className="badge badge-info gap-2">

                                        DeadLine : {ca.deadline}
                                    </div>
                                </h2>
                                

                                <Link to ={`/students/doAssignments/${ca._id}`}><button className="w-full btn mt-2 px-3 bg-purple-600">Do Assignments</button></Link>

                                


                            </div>
                        </div>)
                    }

                </div>

            </div>
        </div>
    );
};

export default ContinueCourse;