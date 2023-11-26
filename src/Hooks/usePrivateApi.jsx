import { useContext } from "react";
import { classRoomcontext } from "../Providers/AuthContext";
import { useNavigate } from "react-router-dom";
import usePublicApi from "./usePublicApi";


const usePrivateApi = () => {
    const {logOut} = useContext(classRoomcontext)
    const navigate = useNavigate()

    usePublicApi.interceptors.request.use(function (config) {
        const token = localStorage.getItem("accessToken");
        config.headers.authorization = `Bearer ${token}`;

        
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      usePublicApi.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response.status;
        if(status ===401 || status===403){
            logOut()
            .then(()=>{})
            .catch(error => console.log(error))
            navigate("/login")
        }
        return Promise.reject(error);
      });

   
};

export default usePrivateApi;