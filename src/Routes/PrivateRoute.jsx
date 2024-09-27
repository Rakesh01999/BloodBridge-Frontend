import { useContext } from "react";
import {  Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";
// import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext) ;
    const location = useLocation() ;
    // console.log(location.pathname) ;
    // console.log(loading) ;
    // console.log(user) ;

    if(loading){
        return <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-primary loading-lg"></span> ;
        </div> 
    }
    if(user) {
        return children ;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;