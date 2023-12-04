import { useContext } from "react";
import { classRoomcontext } from "../Providers/AuthContext";
import usePrivateApi from "./usePrivateApi";
import { useQuery } from "@tanstack/react-query";

const useStudent = () => {
    const {user,loader} = useContext(classRoomcontext)
    const privateApi = usePrivateApi()
    const{data:isStudent,isPending:isStudentPending} = useQuery({
        queryKey:[user?.email,"isStudent"],
        enabled:!loader,
        queryFn: async() =>{
            const res = await privateApi.get(`/user/student/${user.email}`);
                                            
            console.log(res.data);
            return res.data?.student
            

        }
    })
    return [isStudent,isStudentPending]
};

export default useStudent;