import React from 'react';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import { NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';

const Dashboard = () => {

    const isAdmin = true;
    return (
        <div>
            <div><NavBar></NavBar></div>

            {/* --------- for spacing----- */}
            {/* <div className='mb-36'>
                <div className='flex '>
                    
                </div>
            </div> */}

            <h3 className='text-center font-bold text-3xl'> This Is Dashboard</h3>
            <div className="flex">
                {/* dashboard side bar */}
                <div className="w-64 min-h-screen bg-red-500">
                    {/* <div className="w-64 h-96 bg-orange-400"> */}
                    <div className='mt-10'>
                        <ul className="menu">
                            {
                                isAdmin ? <>
                                    <li>
                                        <NavLink to="/dashboard/adminHome">
                                            <FaShoppingCart></FaShoppingCart>
                                            Admin Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addItems">
                                            <FaUtensils></FaUtensils>
                                            Add Items
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manageUsers">
                                            <FaList />
                                            Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/bookings">
                                            <FaBook />
                                            Manage Bookings
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/users">
                                            <FaUsers />
                                            All Users
                                        </NavLink>
                                    </li>
                                    
                                </>
                                    :
                                    <>
                                        <li>
                                            <NavLink to="/dashboard/userHome">
                                                <FaShoppingCart></FaShoppingCart>
                                                User Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/cart">
                                                <FaHome></FaHome>
                                                My Cart ({cart.length})
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/history">
                                                <FaCalendar></FaCalendar>
                                                Not History
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/review">
                                                <FaAd></FaAd>
                                                Add a Review
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/paymentHistory">
                                                <FaList></FaList>
                                                Real Payment History
                                            </NavLink>
                                        </li>
                                    </>
                            }
                            {/* shared nav links */}
                            <div className="divider"></div>
                            <li>
                                <NavLink to="/">
                                    {/* <FaHouse></FaHouse> */}
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order/salad">
                                    {/* <BiSolidFoodMenu /> */}
                                    Menu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order/contact">
                                    <FaEnvelope />
                                    Contact
                                </NavLink>
                            </li>
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
