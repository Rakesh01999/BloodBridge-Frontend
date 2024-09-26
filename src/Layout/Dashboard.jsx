import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { MdBloodtype } from "react-icons/md";
import { FaHome, FaHouseUser } from "react-icons/fa";
import NavBar from '../Pages/Shared/NavBar/NavBar';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {

    // const { user } = useContext(AuthContext)
    // const isAdmin = true;
    // Check if the user has the "admin" role
    //   const isAdmin = user?.role === 'admin';
    //   console.log('user.role:', user.role);
    //   console.log(isAdmin);

    const { user } = useContext(AuthContext); // Get the logged-in user
    const axiosPublic = useAxiosPublic(); // Axios instance for making API requests

    const [isAdmin, setIsAdmin] = useState(false);

    // Fetch all users from the database
    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users'); // Fetch all users
            return res.data;
        }
    });

    useEffect(() => {
        if (users.length > 0 && user) {
            // Find the logged-in user's data in the users array
            const foundUser = users.find(u => u.email === user.email);

            // Check if the user's role is "admin"
            if (foundUser?.role === 'admin') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }, [users, user]);

    console.log("Is Admin:", isAdmin);

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
                            {
                                isAdmin ?
                                    <>
                                        <li><NavLink to='/dashboard/adminHome'><FaHome />Admin Home</NavLink> </li>
                                        <li><NavLink to='/dashboard/allUsers'><MdBloodtype></MdBloodtype>Manage Users</NavLink> </li>
                                        <li><NavLink to='/dashboard/donationAppeal'><FaHouseUser></FaHouseUser>Blood Donation Appeal</NavLink> </li>
                                        <li><NavLink to='/dashboard/requestAppeal'><MdBloodtype></MdBloodtype>Blood Request Appeal</NavLink> </li>
                                        <li><NavLink to='/dashboard/bloodGroups'><FaHouseUser></FaHouseUser>Update Blood Bank</NavLink> </li>
                                    </> :
                                    <>
                                        <li><NavLink to='/dashboard/userHome'><FaHome />User Home</NavLink> </li>
                                        <li><NavLink to='/dashboard/donar'><MdBloodtype></MdBloodtype>Donation blood</NavLink> </li>
                                        <li><NavLink to='/dashboard/donationHistory'><FaHouseUser></FaHouseUser>Blood Donation History</NavLink> </li>
                                        <li><NavLink to='/dashboard/requestblood'><MdBloodtype></MdBloodtype>Request Blood</NavLink> </li>
                                        <li><NavLink to='/dashboard/requestHistory'><FaHouseUser></FaHouseUser>Blood Request History</NavLink> </li>
                                    </>
                            }

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
