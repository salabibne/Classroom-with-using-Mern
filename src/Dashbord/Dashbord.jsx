import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { classRoomcontext } from "../Providers/AuthContext";
import Navbar from "../Shared/Navbar/Navbar";
import useTeacher from "../Hooks/useTeacher";


const Dashbord = () => {
    const [isAdmin] = useAdmin()
    const [isTeacher] = useTeacher()
    const { user } = useContext(classRoomcontext)

    return (
        <div className="flex ">
            <div style={{ backgroundColor: 'rgb(34, 21, 59)' }} className="w-[280px] min-h-screen ">
                <div className=" flex mt-4 avatar justify-center">
                    <div className="w-4 md:w-11 lg:w-11 rounded-full">

                        <img src={user?.photoURL} />



                    </div>
                   


                </div>
                <div>
                      {
                        isAdmin &&   <p className="text-white text-center"> Role : admin</p>

                      }
                      {
                        isTeacher && <p className="text-white text-center">Role:Teacher</p>
                      }
                    </div>
                <ul className="menu">
                    {
                        isAdmin && <>
                            <li className="text-white">
                                <NavLink to="/dashbord/teachereq">

                                    Teacher Request</NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to="/dashbord/users">

                                    Users</NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to="/dashbord/allclasses">

                                    All Classes</NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to="/dashbord/profile">

                                    Profile</NavLink>
                            </li>
                        </>
                    }
                    {
                        isTeacher && <>
                         <li className="text-white">
                                <NavLink to="/dashbord/addClass">

                                   AddClass</NavLink>
                            </li>
                         <li className="text-white">
                                <NavLink to="/dashbord/myClass">

                                   MyClass</NavLink>
                            </li>
                         <li className="text-white">
                                <NavLink to="/dashbord/teacheProfile">

                                   Profile</NavLink>
                            </li>
                        </>
                    }

                </ul>
            </div>

            <div className="flex-1 py-4">
                
                <Outlet></Outlet>
                
            </div>


        </div>
    );
};

export default Dashbord;