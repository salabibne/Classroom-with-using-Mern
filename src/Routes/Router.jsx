

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
  ]);


export default router;