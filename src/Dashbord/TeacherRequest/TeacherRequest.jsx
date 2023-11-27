import { useQuery } from "@tanstack/react-query";
import usePrivateApi from "../../Hooks/usePrivateApi";
import Swal from "sweetalert2";


const TeacherRequest = () => {
    const privateUrl = usePrivateApi()
    const { data: teachereq = [], refetch } = useQuery({
        queryKey: ["techerReq"],
        queryFn: async () => {
            const res = await privateUrl.get("/admin/techereq")
            return res.data

        }

    })

    const accept = (id) => {
        console.log(id);
        const status = { status: "accepte" }
        privateUrl.patch(`/admin/updateAccept/${id}`, status)
            .then(res => {
                console.log(res);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    ;
                    refetch()

                }
            })


    }
    const reject = (id) => {
        console.log(id);
        const status = { status: "rejected" }
        privateUrl.patch(`/admin/updateReject/${id}`, status)
            .then(res => {
                console.log(res);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                    refetch()

                }
            })


    }
    return (
        <div>
            <div className="">
                <table className="table-sm md:table-md lg:table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Images</th>
                            <th>Experience</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>



                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            teachereq.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.photo} />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.experience}</td>
                                <td>{item.title}</td>
                                <td>{item.caregory}</td>
                                {/* <td>{item.status}</td> */}
                                <td>
                                   {item.status ==="accepted" &&<p className="text-green-700 btn">{item.status}</p>}
                                   {item.status ==="rejected" &&<p className="text-red-700 btn">{item.status}</p>}
                                   {item.status ==="pending" &&<p className="text-blue-700 btn">{item.status}</p>}
                                </td>

                                <td>
                                    <div className="flex gap-2">
                                        <button disabled={item.status ==="accepted" ||item.status ==="rejected"} onClick={() => accept(item._id)} className="btn btn-accent ">Accept</button>
                                        <button disabled={item.status =="rejected" ||item.status ==="accepted"} onClick={()=>reject(item._id)} className="btn btn-error">Reject</button>

                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;