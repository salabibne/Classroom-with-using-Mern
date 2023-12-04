

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
import AddClass from "../Dashbord/AddClass/AddClass";
import MyClass from "../Dashbord/MyClass/MyClass";
import TeacherProfile from "../Dashbord/TeacherProfile/TeacherProfile";
import UpdateClass from "../Dashbord/UpdateClass/UpdateClass";
import AllClass from "../Dashbord/AllClass/AllClass";
import Course from "../Course/Course";
import ClassDetails from "../Dashbord/ClassDetails/ClassDetails";
import PopUp from "../Dashbord/PopUp/PopUp";
import CourseDetails from "../Course/CourseDetails";
import MyEnrollClass from "../Dashbord/MyEnrollClass/MyEnrollClass";

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
        },
        {
          path:"/student/allclass",
          element:<Course></Course>
        },
        {
          path:"/student/classDetails/:id",
          element:<PrivateRoutes><CourseDetails></CourseDetails></PrivateRoutes>
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
          path:"/dashbord/allclasses",
          element:<AllClass></AllClass>
        },
        {
          path:"/dashbord/users",
          element:<Users></Users>
        },
        {
          path:"/dashbord/addClass",
          element:<AddClass></AddClass>
        },
        {
          path:"/dashbord/myClass",
          element:<MyClass></MyClass>
        },
        {
          path:"/dashbord/updateClass",
          element:<UpdateClass></UpdateClass>
        },
        {
          path:"/dashbord/teacheProfile",
          element:<TeacherProfile></TeacherProfile>
        },
        {
          path:"/dashbord/myclass/:classid",
          element:<ClassDetails></ClassDetails>
          
        },
        {
          path:"/dashbord/postAssignment/:classid",
          element:<PopUp></PopUp>
        },
        {
          path:"/dashbord/myEnrollClass",
          element:<MyEnrollClass></MyEnrollClass>
        }

       
       
      ]
    }
  ]);


export default router;