import { useContext } from "react";
import { classRoomcontext } from "../Providers/AuthContext";
import usePrivateApi from "./usePrivateApi";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const {user,loader} = useContext(classRoomcontext)
    const secureApi = usePrivateApi()
    const {data:isAdmin,isPending:isAdminPending} = useQuery({
        queryKey:[user?.email,"isAdmin"],
        enabled:!loader,
        queryFn : async() =>{
            const res =  await secureApi.get(`/user/admin/${user.email}`)
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin,isAdminPending]
    
   
};

export default useAdmin;