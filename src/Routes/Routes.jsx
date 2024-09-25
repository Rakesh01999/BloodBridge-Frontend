import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../components/register/Register"
import Login from "../components/login/Login";
import Dashboard from "../Layout/Dashboard";

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
                // element: <UserHome></UserHome>
            },
        ]
    }
]);
