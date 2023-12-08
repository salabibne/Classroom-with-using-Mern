import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import usePublicApi from "../Hooks/usePublicApi";


const ContinueCourse = () => {
    const { id } = useParams()
    const publicApi = usePublicApi()
    const { data: classAssignments = [], refetch } = useQuery({
        queryKey: ["enrollClass"],
        queryFn: async () => {
            const res = await publicApi.get(`/student/continueCourse/${id}`)
            return res.data;
        }
    })
    return (
        <div style={{ backgroundColor: 'rgb(34, 51, 59)' }}>
            <div className="py-14 flex">
                <div className="w-3/4 border-r-4 border-indigo-500 grid grid-cols-2">
                    {  
                        classAssignments.map(ca => <div key={ca._id} className="card w-96 bg-base-100 shadow-xl ml-10 mt-16">
                            <div className="card-body">
                                <h2 className="card-title font-bold">{ca.title}</h2>
                                <h2 className="card-title ">
                                    <div className="badge badge-info gap-2">
                                        
                                       DeadLine : {ca.deadline}
                                    </div>
                                </h2>

                          


                            </div>
                        </div>)
                    }

                </div>
                <div className="w-1/4">p</div>
            </div>
        </div>
    );
};

export default ContinueCourse;