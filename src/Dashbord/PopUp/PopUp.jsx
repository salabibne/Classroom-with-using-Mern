import { useForm } from "react-hook-form";
import { AiOutlineProfile } from "react-icons/ai";

const PopUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)


    }
    return (
        <div className=" ">
            <div className="flex  gap-4 items-center justify-center">
                <p className="text-purple-700"> <AiOutlineProfile /></p>
                <h1 className="text-lg text-gray-800 text-bold">Assignment</h1>
            </div>
            <div className="card shrink-0 w-full  shadow-2xl ">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text ">Title</span>
                        </label>
                        <input {...register("title", { required: true })} type="text" placeholder="Title" className="input input-bordered" />
                        {errors.title && <span className="text-red-700">This  field is required</span>}

                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text ">Deadline</span>
                        </label>
                        <input {...register("deadline", { required: true })} type="date" placeholder="Deadline" className="input input-bordered" />
                        {errors.deadline && <span className="text-red-700">This  field is required</span>}

                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text ">Description</span>
                        </label>

                        <textarea {...register("description", { required: true })} placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full " />

                        {errors.description && <span className="text-red-700">This field is required</span>}

                    </div>







                    <div className="form-control mt-6">
                        <button className="btn btn-primary bg-purple-600">Create Assignment</button>
                    </div>








                </form>
            </div>
        </div>


    );
};

export default PopUp;