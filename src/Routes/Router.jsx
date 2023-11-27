

import {
    createBrowserRouter,
   
  } from "react-router-dom";
import App from "../App";
import Errorpages from "../Errorpages/Errorpages";
import Home from "../Home/Home";
import Login from "../Authentication/Login/Login";
import Registration from "../Authentication/REgistration/Registration";
import TechOn from "../Teacher/TechOn";
import PrivateRoutes from "./PrivateRoutes";
import Dashbord from "../Dashbord/Dashbord";
import TeacherRequest from "../Dashbord/TeacherRequest/TeacherRequest";
import Users from "../Dashbord/Users/Users";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<App></App>,
      errorElement: <Errorpages></Errorpages>,
      children :[
        {
          path:"/",
          element :<Home></Home>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/registration",
          element:<Registration></Registration>
        },
        {
          path:"/techon",
          element:<PrivateRoutes><TechOn></TechOn></PrivateRoutes>
        }
      ]
    },
    {
      path:"/dashbord",
      element:<Dashbord></Dashbord>,
      children :[
        {
          path:"/dashbord/teachereq",
          element:<TeacherRequest></TeacherRequest>
        },
        {
          path:"/dashbord/users",
          element:<Users></Users>
        }
      ]
    }
  ]);


export default router;