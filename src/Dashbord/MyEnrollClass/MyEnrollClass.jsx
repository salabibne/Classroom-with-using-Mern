import { useCallback, useContext } from "react";
import { classRoomcontext } from "../../Providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import usePrivateApi from "../../Hooks/usePrivateApi";
import usePublicApi from "../../Hooks/usePublicApi";
import { Link } from "react-router-dom";



const MyEnrollClass = () => {
    const { user } = useContext(classRoomcontext);
    const publicApi = usePublicApi()
    const privateApi = usePrivateApi()
    const { data: enrollClass = [], refetch } = useQuery({
        queryKey: ["enrollClass"],
        queryFn: async () => {
            const res = await publicApi.get(`/user/studnet/enrollclass/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <div  className="hero ">
                <div className="py-14 grid grid-cols-2  gap-5">
                    {
                        enrollClass.map(classDetail => <div style={{ backgroundColor: 'rgb(34, 51, 59)' }} key={classDetail._id} className=" card w-96  shadow-2xl">
                            <div className="flex items-center justify-center">
                                <div>
                                    <figure><img className="flex-1" width={200} height={150} src={classDetail.image} alt="Album" /></figure>
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title"> <span className="text-white">CourseName: {classDetail.title}</span>  </h2>
                                    <p className=""><span className="text-white">Instructor's Name: {classDetail.name}</span> </p>
                                    



                                </div>
                                
                            </div>
                            <Link to ={`/student/continueCourse/${classDetail._id}`}><button className="btn w-full bg-purple-700">Continue</button></Link>
                        </div>)
                    }
                </div>

            </div>
        </div>
    );
};

export default MyEnrollClass;