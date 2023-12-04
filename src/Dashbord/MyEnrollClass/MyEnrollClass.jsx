import { useCallback, useContext } from "react";
import { classRoomcontext } from "../../Providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import usePrivateApi from "../../Hooks/usePrivateApi";



const MyEnrollClass = () => {
    const { user } = useContext(classRoomcontext);
    const privateApi = usePrivateApi()
    const { data: enrollClass = [], refetch } = useQuery({
        queryKey: ["enrollClass"],
        queryFn: async () => {
            const res = await privateApi.get(`/user/studnet/enrollclass/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <div style={{ backgroundColor: 'rgb(34, 21, 59)' }} className="hero">
                <div className="mt-12 p-14">
                    {
                        enrollClass.map(classDetail => <div key={classDetail._id} className="card card-side bg-slate-50 shadow-2xl">
                            <figure><img src={classDetail.image} alt="Album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title"> <span className="text-purple-800">CourseName</span> : </h2>
                                <p className="text-lg"><span className="text-purple-800">Instructor's Name</span> :</p>

                                <p className="text-lg"><span className="text-purple-800">Description</span> : </p>
                                <p className="text-lg"><span className="text-purple-800">TotalEnroll </span> </p>

                                <div className="card-actions  justify-center items-center">
                                    <p className="text-lg"><span className="text-purple-800">price</span> : </p>
                                    <button  className="btn bg-purple-800 text-yellow-50 ">Enroll Now !</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>

            </div>
        </div>
    );
};

export default MyEnrollClass;