import AuthContext from "./authContext";
import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
const PrivateRoutes =()=>{
    const {isLogedin} = useContext(AuthContext);
    return isLogedin ? <Outlet/> : <Navigate to="/"/>
}

export default PrivateRoutes;