import { useContext } from "react";
import Swal from "sweetalert2";
import usePublicApi from "../../Hooks/usePublicApi";
import usePrivateApi from "../../Hooks/usePrivateApi";
import { useForm } from "react-hook-form";
import { classRoomcontext } from "../../Providers/AuthContext";


const UpdateClass = () => {
    const {user} = useContext(classRoomcontext)
    const publicApi = usePublicApi()
    const privateApi = usePrivateApi()
    const imageApi =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB}`;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async(data) => {
        const imageBody = {
            image: data.image[0]
        }
        const img_res = await publicApi.post(imageApi,imageBody,{
            headers: {
                "Content-type": "multipart/form-data"
            }
        })
        if(img_res.data.success){
            const addClassInfo = {
                title:data.title,name:data.name,email:data.email,description:data.description,price:data.price,image:img_res.data.data.display_url,
                status:"pending"

            }
            const dataItem = await privateApi.patch(`/teacher/updateClass/${user.email}`,addClassInfo)
            if(dataItem.data.modifiedCount){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updated class info has been forwarded to Admin Panal",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

            
        }

    
        console.log(img_res);
        console.log(data);
    }
    return (
        <div className="hero min-h-screen">
            <div className="hero-content mt-8 flex-col">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold mt-8 "> Update Class Information</h1>

                </div>
                <div className="card shrink-0 w-full  shadow-2xl ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  ">Title</span>
                            </label>
                            <input  {...register("title", { required: true })} type="text" placeholder="Course Title" className="input input-bordered" />
                            {errors.title && <span className="text-red-700">This Name field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  ">Name</span>
                            </label>
                            <input value={user?.displayName} {...register("name", { required: true })} type="text" placeholder="Email" className="input input-bordered" />
                            {errors.name && <span className="text-red-700">This Email field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  ">Email</span>
                            </label>
                            <input value={user?.email} {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered" />
                            {errors.email && <span className="text-red-700">This  field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  ">Description</span>
                            </label>
                            <input  {...register("description", { required: true })} type="text" placeholder="Description" className="input input-bordered" />
                            {errors.description && <span className="text-red-700">This  field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  ">Price</span>
                            </label>

                            <input    {...register("price", { required: true })} placeholder="price" className="input input-bordered " />
                            {errors.photourl && <span className="text-red-700">This  field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  ">Image</span>
                            </label>

                            <input type="file"  {...register("image", { required: true })} placeholder="image" className=" file-input file-input-bordered w-full max-w-xs" />
                            {errors.image && <span className="text-red-700">This  field is required</span>}

                        </div>






                        <div className="form-control mt-6">
                            <button className="btn btn-primary">UpdateClass</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateClass;