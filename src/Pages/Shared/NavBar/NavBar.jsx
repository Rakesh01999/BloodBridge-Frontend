import React, { useContext } from 'react';
// import Menu from '../../Menu/Menu/Menu';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
// import useCart from '../../../hooks/useCart';
// import useAdmin from '../../../hooks/useAdmin';
import dropletLogo from '../../../assets/images/white-droplet.png'

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart() ;
    // console.log('cart-length',cart.length);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User logged out Successfully.')
            })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/">Home</Link></li>
        <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/dashboard">Dashboard</Link></li>
        {/* <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/order/Mango">Order Mango</Link></li> */}


    </>

    return (
        <>
            {/* <div className="navbar fixed z-10 bg-base-100"> */}
            <div className="navbar fixed z-10 bg-opacity-25 max-w-screen-xl bg-black text-white mb-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-opacity-45 bg-black rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost text-xl">BloodBridge</a> */}
                    <a className="text-xl flex gap-1">
                        <img src={dropletLogo} className='w-2 md:w-6' alt="dropletlogo" />
                        <span className='text-sm md:text-xl'>Blood Bridge</span>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <a className="btn">Button</a> */}
                    {/* <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/secret">Secret</Link></li> */}
                    {
                        // user ? 'true' : 'false'
                        // user ? condition ? 'double true' : 'one true' : 'false'
                    }
                    {
                        // user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                    }
                    {
                        // user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                    }
                    {/* <li className=''>
                        <Link to="/dashboard/cart">
                            <button className='btn-sm flex gap-1 hover:text-yellow-300 hover:font-bold hover:text-[15px]'>
                                <FaShoppingCart className='' />
                                <div className='badge badge-secondary'>+{cart.length}</div>
                            </button>
                        </Link>
                    </li> */}
                    {
                        user ? (
                            <>
                                <div className="flex flex-col md:flex-row items-center gap-2">
                                    <p className="text-sm md:text-base text-white">{user.displayName}</p>
                                    <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                        <img className="w-10 h-10 md:w-14 md:h-14 border-2 border-red-600 rounded-full" src={user.photoURL} alt="User Profile" />
                                    </div>
                                </div>
                                <button onClick={handleLogOut} className="btn btn-info bg-orange-600 md:h-14 btn-sm md:w-28">
                                    Log out
                                    {/* <FaArrowRight></FaArrowRight> */}
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <button className="btn btn-info btn-sm md:h-14 md:w-28 ">Log in</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn bg-green-300 md:h-14 text-blue-700 btn-sm md:w-28">Register</button>
                                </Link>
                            </div>
                        )
                    }
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default NavBar;
