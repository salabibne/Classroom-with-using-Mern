import { useQuery } from "@tanstack/react-query";
import usePublicApi from "../Hooks/usePublicApi";


const Course = () => {
    const publicApi = usePublicApi()
    const { data: classreqs = [], refetch } = useQuery({
        queryKey: ["classreq"],
        queryFn: async () => {
            const res = await publicApi.get('/student/allclass')
            return res.data

        }

    })
    return (
     <div  style={{ backgroundColor: 'rgb(34, 21, 59)' }} className="hero min-h-screen"> 
           <div className="grid grid-cols-3 gap-5 p-8 mt-10 ">
        {
            classreqs.map(classreq => <div key={classreq._id} className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={classreq.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title flex">
                        {classreq.title}
                       
                    </h2>
                    <p>Name :{classreq.name}</p>
                    <p>Email :{classreq.email}</p>
                    <p>price :{classreq.price}</p>
                    <p>{classreq.description}</p>
                    <button disabled={classreq.status === "pending"} className="btn btn-outline w-full">SeeDetails</button>
                    <button  className="btn btn-outline w-full">Enroll</button>

                   

                </div>
            </div>)
        }
    </div>
     </div>
    );
};

export default Course;