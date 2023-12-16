import { useQuery } from "@tanstack/react-query";
import usePrivateApi from "../../Hooks/usePrivateApi";
import usePublicApi from "../../Hooks/usePublicApi";
import { useParams } from "react-router-dom";


const EvaluateAssignment = () => {
    const {user} = useParams()
    const publicApi = usePublicApi()
    const privateApi = usePrivateApi()
    const { data: evaluateAssignments = [], refetch } = useQuery({
        queryKey: ["enrollClass"],

        queryFn: async () => {
            const res = await publicApi.get(`/evaluateAssignment/${user}`)
            return res.data;
        }
    })
    return (
        <div>
          {
            evaluateAssignments.length ?  <p>ok</p>:<p>assignment notsubmitted or you dont create assignment</p>
          }
        </div>
    );
};

export default EvaluateAssignment;