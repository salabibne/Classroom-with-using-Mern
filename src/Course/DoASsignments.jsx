import { useParams } from "react-router-dom";
import usePublicApi from "../Hooks/usePublicApi";
import { useQuery } from "@tanstack/react-query";


const DoASsignments = () => {


    const { id } = useParams()
    const publicApi = usePublicApi()
    const { data: doAssignments = [], refetch } = useQuery({
        queryKey: ["enrollClass"],

        queryFn: async () => {
            const res = await publicApi.get(`/student/doAssignments/${id}`)
            return res.data;
        }
    })

    const submitAns = e => {
        e.preventDefault()
        alert("must submit public link")
        const answer = e.target.answer.value;
        
        console.log(answer);

    }
    return (
        <div style={{ backgroundColor: 'rgb(34, 51, 59)' }}>
            <div className="py-14 flex">

                <div className="w-3/4 border-r-4 border-indigo-500 flex items-center justify-center ">
                    {
                        doAssignments.map(ca => <div key={ca._id} className="card w-96 px-12 bg-base-100 shadow-xl ml-10 mt-16">
                            <div className="card-body p-5">
                                <h2 className="card-title font-bold">{ca.title}</h2>
                                <h2 className="card-title ">
                                    <div className="badge badge-info gap-2">

                                        DeadLine : {ca.deadline}
                                    </div>
                                </h2>
                                <p><span className="text-blue-600">Instructions </span>: {ca.description}</p>







                            </div>
                        </div>)
                    }

                </div>
                <div className="w-1/4  items-center   flex flex-col space-y-4 mr-4">


                    <div className="card shrink-0  max-w-sm shadow-2xl bg-base-100">
                        <form  onSubmit={submitAns} className="card-body">
                            <h1 className="bg-purple-800 p-2 text-white mx-auto font-bold rounded-md">Submit Your Answer</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">GoogleDrive Link</span>
                                </label>
                                <input type="text" placeholder="Paste Public Link" name="answer" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6">
                                <button  className="btn bg-purple-800 text-white">submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default DoASsignments;