import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../components/register/Register"
import Login from "../components/login/Login";

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
                 path:'/register',
                 element:<Register/>
            },
            {
                path:'/login',
                element: <Login/>
            }
        ]
    },
]);