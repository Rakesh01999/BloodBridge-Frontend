import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../components/register/Register"
import Login from "../components/login/Login";
import Dashboard from "../Layout/Dashboard";
import Donar from "../Pages/Dashboard/Donationblood/Donar";
import Donationhistory from "../Pages/Dashboard/Donationblood/Donationhistory";
import Requestblood from "../Pages/Dashboard/Donationblood/Requestblood";
import Requesthistory from "../Pages/Dashboard/Donationblood/Requesthistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    {
        path: '/dashboard',
        // element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        element: <Dashboard></Dashboard>,
        children: [
            // normal user routes
            {
                path: 'userHome',
                // path: '/dashboard/userHome',
                element: <UserHome></UserHome>
            },
            {
                path:'donar',
                element:<Donar></Donar>
            },
            {
                path:'history',
                element:<Donationhistory></Donationhistory> 
            },
            {
                path:'requestblood',
                element:<Requestblood></Requestblood>
            },
            {
                path:'requesthistory',
                element:<Requesthistory></Requesthistory>   
            }
        ]
    }
]);
