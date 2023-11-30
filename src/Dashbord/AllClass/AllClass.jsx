import { useQuery } from "@tanstack/react-query";
import usePrivateApi from "../../Hooks/usePrivateApi";
import Swal from "sweetalert2";


const AllClass = () => {
    const privateUrl = usePrivateApi()
    const { data: user = [], refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await privateUrl.get("/admin/allclass")
            return res.data

        }

    })

    const accept = (id) => {
        console.log(id);
        const status = { status: "approved" }
        privateUrl.patch(`/admin/allclassaccept/${id}`, status)
            .then(res => {
                console.log(res);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Class Approved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                    refetch()

                }
            })


    }

    const reject = (id) => {
        console.log(id);
        const status = { status: "rejected" }
        privateUrl.patch(`/admin/allclassaccept/${id}`, status)
            .then(res => {
                console.log(res);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Class Rejected",
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
                            <th>Title</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>price</th>
                            <th>Status</th>

                            <th>See Progress</th>
                            <th>Action</th>



                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            user.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.title}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                
                                {/* <td>{item.status}</td> */}
                                <td>
                                    {item.status === "approved" && <p className="text-green-700 btn">{item.status}</p>}
                                    {item.status === "rejected" && <p className="text-red-700 btn">{item.status}</p>}
                                    {item.status === "pending" && <p className="text-blue-700 btn">{item.status}</p>}
                                </td>
                                <td>{item.caregory}</td>

                                <td>
                                    <div className="flex gap-2">
                                        <button disabled={item.status === "approved" || item.status === "rejected"} onClick={()=>accept(item._id)} className="btn btn-accent ">Approved</button>
                                        <button disabled={item.status == "rejected" || item.status === "approved"}  onClick={()=>reject(item._id)} className="btn btn-error">Rejected</button>

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

export default AllClass;