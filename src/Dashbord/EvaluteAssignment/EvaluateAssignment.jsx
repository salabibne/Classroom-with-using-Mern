import { useQuery } from "@tanstack/react-query";
import usePrivateApi from "../../Hooks/usePrivateApi";
import usePublicApi from "../../Hooks/usePublicApi";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const EvaluateAssignment = () => {
  const { user } = useParams()
  const publicApi = usePublicApi()
  const privateApi = usePrivateApi()
  const { data: evaluateAssignments = [], refetch } = useQuery({
    queryKey: ["enrollClass"],

    queryFn: async () => {
      const res = await publicApi.get(`/evaluateAssignment/${user}`)
      return res.data;
    }
  })

  const evaluateAssignmentMarks = async(e,mail)=>{
    e.preventDefault()
    const assignmentMarks = e.target.mark.value;
    // const studentEmail= mail
    // console.log(assignmentMarks);
    // console.log(studentEmail);
    const mark ={assignmentMarks}

    const res = await publicApi.patch(`/marksByTeacher/${mail}`,mark)
    if(res.data.modifiedCount){
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Marks has been given to the Student",
          showConfirmButton: false,
          timer: 1500
        });
  }

  }
  return (
    <div>
      <Helmet>
        <title>Evaluate Assignment</title>
      </Helmet>
      <p className="text-center p-8 font-semibold text-purple-700 text-4xl">Evaluate Assignment</p>
      {
        evaluateAssignments.length ? <>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th className="text-purple-800">StudentEmail</th>
                  <th className="text-purple-800">ClassName</th>
                  <th className="text-purple-800">Assignment</th>
                  <th className="text-purple-800">Answer</th>
                  <th className="text-purple-800">Marks</th>


                </tr>
              </thead>
              <tbody>

                {
                  evaluateAssignments.map((ea, idx) => <tr key={ea._id}>
                    <th>{idx + 1}</th>
                    <td>{ea.student}</td>
                    <td>{ea.classTitle}</td>
                    <td>{ea.assignmentTitle}</td>
                    <td>{ea.answer}</td>
                    <td>

                      <form onSubmit={(e)=>evaluateAssignmentMarks(e,ea.student)}>
                        <div className="form-control flex">
                         
                          <input type="number" name="mark" placeholder="Marks" className="input input-bordered" required />
                          <button type="submit" className="btn bg-purple-700 text-white">Update</button>

                        </div>
                        
                      </form>
                    </td>
                    {/* <td><button className="btn btn-info">Update</button></td> */}

                  </tr>)
                }

              </tbody>
            </table>
          </div>
        </> : <p>assignment notsubmitted or you dont create assignment</p>
      }
    </div>
  );
};

export default EvaluateAssignment;