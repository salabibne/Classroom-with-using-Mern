import { useContext } from "react";
import usePublicApi from "../Hooks/usePublicApi";
import { classRoomcontext } from "../Providers/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const TechOn = () => {
    const { user } = useContext(classRoomcontext);
    const publicApi = usePublicApi()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        
            

                const userInfo = { name: data.name,  photo: data.photourl,experience:data.experience,caregory:data.caregory,status:"pending" }
                publicApi.post('/teacher', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your teaching request has been sent.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // reset()
                        }
                    })


                
              

          
    }
    return (
        <div style={{ backgroundColor: 'rgb(34, 21, 59)' }} className="hero min-h-screen">
            <div className="hero-content mt-8 flex-col">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold mt-8 text-white">Form for Teaching</h1>

                </div>
                <div className="card shrink-0 w-full  shadow-2xl ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input defaultValue={user?.displayName} {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-700">This Name field is required</span>}

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">PhotoUrl</span>
                            </label>
                            <input defaultValue={user?.photoURL} {...register("photourl", { required: true })} type="text" placeholder="photourl" className="input input-bordered" />
                            {errors.photourl && <span className="text-red-700">This  field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Choose Your Options</span>
                            </label>
                            <select {...register("experience")} className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Your Experince Level?</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Experinced</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Category </span>
                            </label>
                            <select {...register("caregory")} className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Which category are you want to add?</option>
                                <option>Web Development</option>
                                <option>Digital Marketting</option>
                                <option>Data Science</option>
                                <option>Data structure And ALgorithom</option>
                                <option>Photography</option>
                            </select>
                        </div>



                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Review</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default TechOn;