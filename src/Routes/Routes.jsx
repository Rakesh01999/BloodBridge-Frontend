import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../components/register/Register"
import Login from "../components/login/Login";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Donar from "../Pages/Dashboard/Donation&RequestBlood/Donar";
import Requestblood from "../Pages/Dashboard/Donation&RequestBlood/Requestblood";
import Requesthistory from "../Pages/Dashboard/Donation&RequestBlood/Requesthistory";
import Donationhistory from "../Pages/Dashboard/Donation&RequestBlood/Donationhistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import ManageUsers from "../Pages/Dashboard/AdminAccess/ManageUsers";
import DonationAppeal from "../Pages/Dashboard/AdminAccess/DonationAppeal";
import RequestAppeal from "../Pages/Dashboard/AdminAccess/RequestAppeal";
import UpdateBloodBank from "../Pages/Dashboard/AdminAccess/UpdateBloodBank";
import PrivateRoute from "./PrivateRoute";

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
                path: 'donar',
                element: <Donar></Donar>
            },
            {
                path: 'donationHistory',
                element: <Donationhistory></Donationhistory>
            },
            {
                path: 'requestblood',
                element: <Requestblood></Requestblood>
            },
            {
                path: 'requesthistory',
                element: <Requesthistory></Requesthistory>
            },
            // admin only routes
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'allUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'donationAppeal',
                element: <DonationAppeal></DonationAppeal>
            },
            {
                path: 'requestAppeal',
                element: <RequestAppeal></RequestAppeal>
            },
            {
                path: 'bloodGroups',
                element: <UpdateBloodBank></UpdateBloodBank>
            }
        ]
    }
]);
