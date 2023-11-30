import { useContext } from "react";
import { classRoomcontext } from "../Providers/AuthContext";
import usePrivateApi from "./usePrivateApi";
import { useQuery } from "@tanstack/react-query";


const useTeacher = () => {
    const {user,loader} = useContext(classRoomcontext);
    const privateApi = usePrivateApi();
    const {data:isTeacher,isPending:isTeacherPending} = useQuery({
        queryKey:[user?.email,"isTeacher"],
        enabled:!loader,
        queryFn: async()=>{
            const res = await privateApi.get(`/user/teacher/${user.email}`);
            console.log(res.data);
            return res.data?.teacher
        }
    })
  return [isTeacher,isTeacherPending]
};

export default useTeacher;