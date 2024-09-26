import React from 'react';
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { MdBloodtype } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import NavBar from '../Pages/Shared/NavBar/NavBar';

const Dashboard = () => {

    const isAdmin = true;
    return (

        <div>
            <div><NavBar></NavBar></div>

            {/* <h3 className='text-center font-bold text-3xl'> This Is Dashboard</h3> */}

            {/* --------- for spacing----- */}
            {/* <div className='mb-8'>
                <div className='flex '>

                </div>
            </div> */}

            <div className="flex">
                {/* side bar */}


                <div className="w-64 min-h-screen bg-red-700 text-white">
                    <div className='mt-20'>
                        <ul className="menu p-4">
                            <li><NavLink to='/dashboard/donar'><MdBloodtype></MdBloodtype>Donation blood</NavLink> </li>
                            <li><NavLink to='/dashboard/donationHistory'><FaHouseUser></FaHouseUser>Blood Donation History</NavLink> </li>
                            <li><NavLink to='/dashboard/requestblood'><MdBloodtype></MdBloodtype>Request Blood</NavLink> </li>
                            <li><NavLink to='/dashboard/requestHistory'><FaHouseUser></FaHouseUser>Blood Request History</NavLink> </li>

                        </ul>
                    </div>

                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
