import React from 'react';
import { NavLink, Navigate, Outlet} from "react-router-dom";
import { MdBloodtype } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

const Dashboard = () => {
    return (
       
            <div className="flex">
            {/* side bar */}
            <div className="md:w-64 w-64 min-h-screen bg-blue-600 text-white ">
            <ul className="menu p-8 lg:w-[280px]">
            <li><NavLink to='/dashboard/donar'><MdBloodtype></MdBloodtype>Donation blood</NavLink> </li>
            {/* <li><NavLink to='/dashboard/history'><FaHouseUser></FaHouseUser> Donation History</NavLink> </li> */}
            <li><NavLink to='/dashboard/requestblood'><MdBloodtype></MdBloodtype>request blood</NavLink> </li>
            <li><NavLink to='/dashboard/requesthistory'><FaHouseUser></FaHouseUser>Details of history</NavLink> </li>
            
            </ul>
           
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;