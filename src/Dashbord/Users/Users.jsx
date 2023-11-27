import { useQuery } from "@tanstack/react-query";
import usePrivateApi from "../../Hooks/usePrivateApi";


const Users = () => {
    const privateUrl = usePrivateApi()
    const { data: user = [], refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await privateUrl.get("/users")
            return res.data

        }

    })
    return (
        <div>
             <div className="">
                <table className="table-sm md:table-md lg:table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>UserName</th>
                            <th>UserEmail</th>
                            <th>Role</th>
                            <th>UserImage</th>
                            <th>Action</th>
                            




                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            user.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.photo} />
                                        </div>
                                    </div>
                                </td>
                               
                                
                               
                               

                                <td>
                                    
                                        <button disabled={item.role ==="admin"}  className="btn btn-accent ">MakeAdmin</button>
                                        

                                  
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;