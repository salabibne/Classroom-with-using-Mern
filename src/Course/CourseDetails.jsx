import { useQuery } from "@tanstack/react-query";
import usePublicApi from "../Hooks/usePublicApi";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { classRoomcontext } from "../Providers/AuthContext";
import Swal from "sweetalert2";
// const { ObjectId } = require('mongodb');



const CourseDetails = () => {
    const {user} = useContext(classRoomcontext);
    const publicApi = usePublicApi()
    const {id} = useParams()
    console.log("courdetails",id);
    const { data: classDetails = [], refetch } = useQuery({
        queryKey: ["classDetails"],
        queryFn: async () => {
            const res = await publicApi.get(`/student/classDetails/${id}`)
            
            return res.data

        }

    })
    // const enrollClass = async(id)=>{
    //     const enrollData = {user:user?.email,classId:id}
    //     const res = await publicApi.post("/student/enroll",enrollData)
    //     if(res.data.insertedId){
    //         Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "You successfully purchase the class!s",
    //             showConfirmButton: false,
    //             timer: 1500
    //           });
    //     }
       
    // }
    return (
        <div style={{ backgroundColor: 'rgb(34, 21, 59)' }} className="hero">
           <div  className="mt-12 p-14">
           {
                classDetails.map(classDetail => <div key={classDetail._id} className="card card-side bg-slate-50 shadow-2xl">
                    <figure><img  src={classDetail.image} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title"> <span className="text-purple-800">CourseName</span> : {classDetail.title}</h2>
                        <p className="text-lg"><span className="text-purple-800">Instructor's Name</span> : {classDetail.name}</p>
                        
                        <p className="text-lg"><span className="text-purple-800">Description</span> : {classDetail.description}</p>
                        <p className="text-lg"><span className="text-purple-800">TotalEnroll </span> </p>
                       
                        <div className="card-actions  justify-center items-center">
                        <p className="text-lg"><span className="text-purple-800">price</span> : {classDetail.price}</p>
                            <Link to ={`/payment/class/${classDetail._id}?price=${classDetail.price}`}><button  className="btn bg-purple-800 text-yellow-50 ">Enroll Now !</button></Link>
                        </div>
                    </div>
                </div>)
            }
           </div>

        </div>
    );
};

export default CourseDetails;