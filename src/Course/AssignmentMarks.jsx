import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { classRoomcontext } from "../Providers/AuthContext";
import usePublicApi from "../Hooks/usePublicApi";
import usePrivateApi from "../Hooks/usePrivateApi";
import { useQuery } from "@tanstack/react-query";


const AssignmentMarks = () => {
    const { user } = useContext(classRoomcontext)
  const publicApi = usePublicApi()
  const privateApi = usePrivateApi()
  const { data: assignmentMark = [], refetch } = useQuery({
    queryKey: ["assignmentmarks"],

    queryFn: async () => {
      const res = await publicApi.get(`/assignmentMark/${user.email}`)
      return res.data;
    }
  })
    return (
        <div>
            
            <Helmet>
                <title>Assignment Marks</title>
            </Helmet>
            <p className="text-center p-8 font-semibold text-purple-700 text-4xl"> Assignment Mark</p>
            {
    assignmentMark.length ? <>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                
                  <th className="text-purple-800">ClassName</th>
                  <th className="text-purple-800">Assignment</th>
                  <th className="text-purple-800">Marks</th>


                </tr>
              </thead>
              <tbody>

                {
                  assignmentMark.map((am, idx) => <tr key={am._id}>
                    <th>{idx + 1}</th>
                    <td>{am.classTitle}</td>
                 
                    <td>{am.assignmentTitle}</td>
                    <td>{am.assignmentMark}</td>
                   
                   

                  </tr>)
                }

              </tbody>
            </table>
          </div>
        </> : <p>Assignment mark is not yet published</p>
      }
        </div>
    );
};

export default AssignmentMarks;