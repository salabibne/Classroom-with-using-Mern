import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { classRoomcontext } from "../../Providers/AuthContext";
import { AiOutlineGoogle } from "react-icons/ai";

const Login = () => {
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";
    let navigate = useNavigate();

    const { login, gsign } = useContext(classRoomcontext)
    const googleWithLogin = () => {
         gsign()
         navigate(from, { replace: true });
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        login(data.email, data.password)
            .then((userinfo) => {
                const user = userinfo.user;
                console.log("loginpage", user);
                navigate(from, { replace: true });
            })
            .error((error) => {
                console.log(error);
            })

    }
  
    return (


        <div style={{ backgroundColor: 'rgb(34, 21, 59)' }} className="hero min-h-screen">
            <div className="hero-content mt-8 flex-col">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold mt-8 text-white">Login now!</h1>

                </div>
                <div className="card shrink-0 w-full  shadow-2xl ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered" />
                            {errors.email && <span className="text-red-700">This Email field is required</span>}

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">PassWord</span>
                            </label>
                            <input {...register("password", { required: true, minLength: 6, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/ })} type="text" placeholder="password must be 6 character including upper,lower,number and special symbol" className="input input-bordered" />
                            {errors.password?.type === "required" && <span className="text-red-700" >This password field is required</span>}
                            {errors.password?.type === "minLength" && <span className="text-red-700">password length must be 6</span>}
                            {errors.password?.type === "pattern" && <span className="text-red-700">at least one uppercase letter, one lowercase letter, one number and one special character</span>}

                        </div>


                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                       
                        <p className="text-center text-white">Or continue with </p>
                      
                        <div className='text-center '>
                            <div className="text-white" onClick={googleWithLogin}>
                                <button className="btn"><AiOutlineGoogle /></button>
                            </div>
                        </div>



                        <p className="text-white">
                            New user ? <Link to="/registration"><button className="btn">Register</button></Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;