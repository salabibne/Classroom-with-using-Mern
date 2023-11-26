
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { classRoomcontext } from "../../Providers/AuthContext";
import { useContext } from "react";
import usePublicApi from "../../Hooks/usePublicApi";
import Swal from "sweetalert2";

const Registration = () => {
    

    const {createUser,updateUserProfile} = useContext(classRoomcontext);
    const publicApi = usePublicApi()
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email,data.password)
        .then((userinfo)=>{
            const user = userinfo.user
           
            updateUserProfile(data.name,data.photourl)
            .then(()=>{
                console.log("updated user info done");
            })

           const userInfo ={name : data.name,email:data.email,photo: data.photourl}
           publicApi.post('/users',userInfo)
           .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Registration has been successfull",
                    showConfirmButton: false,
                    timer: 1500
                  });
                reset()
            }
           })

            
            .catch(error =>{
                console.log(error);
            })
            
            console.log(user);
        })

        .catch(error =>{
            console.error(error);
        })
    }
    return (
        <div style={{backgroundColor: 'rgb(34, 21, 59)'}} className="hero min-h-screen">
            <div className="hero-content mt-8 flex-col">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold mt-8 text-white">Register now!</h1>
                  
                </div>
                <div className="card shrink-0 w-full  shadow-2xl ">
                    <form  onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input {...register("name",{required:true})} type="text" placeholder="Your Name" className="input input-bordered"  />
                            {errors.name && <span className="text-red-700">This Name field is required</span>}
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input {...register("email",{required:true})} type="email" placeholder="Email" className="input input-bordered"  />
                            {errors.email && <span className="text-red-700">This Email field is required</span>}
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">PhotoUrl</span>
                            </label>
                            <input {...register("photourl",{required:true})} type="text" placeholder="Email" className="input input-bordered"  />
                            {errors.photourl && <span className="text-red-700">This  field is required</span>}
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">PassWord</span>
                            </label>
                            <input {...register("password",{required:true,minLength:6,pattern:/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/})} type="text" placeholder="password must be 6 character including upper,lower,number and special symbol" className="input input-bordered"  />
                            {errors.password?.type ==="required" && <span className="text-red-700" >This password field is required</span>}
                            {errors.password?.type ==="minLength" && <span className="text-red-700">password length must be 6</span>}
                            {errors.password?.type ==="pattern" && <span className="text-red-700">at least one uppercase letter, one lowercase letter, one number and one special character</span>}
                            
                        </div>

                        
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Registration</button>
                        </div>
                        <p className="text-white">
                            Already user ? <Link to="/login"><button className="btn">Login</button></Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;