
import { Link, NavLink } from "react-router-dom";
// import logo from "../../../public/assests/logo/keepup.png"
import { useContext } from "react";
import { classRoomcontext } from "../../Providers/AuthContext";
import useAdmin from "../../Hooks/useAdmin";
import useTeacher from "../../Hooks/useTeacher";


const Navbar = () => {
    const { user, logOut } = useContext(classRoomcontext);
    const[isAdmin] = useAdmin()
    const[isTeacher] = useTeacher()
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/student/allclass">All Classes</NavLink></li>
        <li><NavLink to="/techon">Tech on KeepUP </NavLink></li>

        {
            user  && isAdmin &&   <li><NavLink to="/dashbord/teachereq">TeacherRequest</NavLink></li>
            
        }
         {
            user  && isTeacher &&   <li><NavLink to="/dashbord/addClass">AddClass</NavLink></li>
            
        }



    </>

    const userlogout = () => {
        return logOut()
    }
    return (
        <div>
            <div style={{ backgroundColor: 'rgb(34, 21, 59)' }} className="navbar  text-white  z-10 sticky  ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn  lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl text-red-500 font-bold">
                            Keep<span className="text-3xl text-black font-bold">UP</span>
                        </h2>

                        <p className=" font-bold text-sm">Clicks Your Future</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                {
                    user && <div className="dropdown dropdown-end text-white">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2  menu menu-sm dropdown-content rounded-box w-52">
                            <li>
                                {/* <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a> */}
                            </li>
                            <li className="btn text-blue-500">{user?.displayName}</li>
                            <li className="btn btn-primary"><Link to="/dashbord">DashBord</Link></li>
                            <li onClick={userlogout} className="btn btn-primary">LogOut</li>
                        </ul>
                    </div>
                }
                {
                    !user && <div className="navbar-end">
                        <Link to="/login"><button className="btn">Login</button></Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;