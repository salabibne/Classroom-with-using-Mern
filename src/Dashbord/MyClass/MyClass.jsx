import { useContext } from "react";
import { classRoomcontext } from "../../Providers/AuthContext";
import usePrivateApi from "../../Hooks/usePrivateApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const MyClass = () => {
    const { user } = useContext(classRoomcontext)
    const privateApi = usePrivateApi();
    const { data: classreqs = [], refetch } = useQuery({
        queryKey: ["classreq"],
        queryFn: async () => {
            const res = await privateApi.get(`/teacher/myClass/${user.email}`)
            return res.data

        }

    })

    const deleteClass = (_id) => {
        Swal.fire({
            title: "Are you sure to delete ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                privateApi.delete(`/teacher/deleteClass/${_id}`)
                .then(res =>{
                    if(res.data.deletedCount){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()

                    }
                })
            
                
            }
        });
    }


    return (
        <div className="grid grid-cols-3 p-8">
            {
                classreqs.map(classreq => <div key={classreq._id} className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={classreq.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title flex">
                            {classreq.title}
                            {
                                classreq.status ==="approved" && <div className="badge badge-primary">{classreq.status}</div>
                            }
                            {
                                classreq.status ==="pending" && <div className="badge badge-primary">{classreq.status}</div>
                            }
                            {
                                classreq.status ==="rejected" && <div className="badge badge-error">{classreq.status}</div>
                            }
                        </h2>
                        <p>Name :{classreq.name}</p>
                        <p>Email :{classreq.email}</p>
                        <p>price :{classreq.price}</p>
                        <p>{classreq.description}</p>
                        <Link to ={`/dashbord/myclass/${classreq._id}`}><button  disabled={classreq.status === "pending" || classreq.status === "rejected"} className="btn w-full">SeeDetails</button></Link>
                        <div className="card-actions justify-center">
                            <Link to="/dashbord/updateClass"><button disabled={classreq.status === "rejected"} className="btn btn-outline btn-warning">Update</button></Link>
                            <button disabled={classreq.status === "rejected"} onClick={()=>deleteClass(classreq._id)} className="btn btn-outline btn-error">Delete</button>
                        </div>

                    </div>
                </div>)
            }
        </div>
    );
};

export default MyClass;