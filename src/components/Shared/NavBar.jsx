import { useState } from "react";
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const NavBar = () => {

    const [open, setOpen] = useState(false); // 🔹 added
    const {user, logOutUser} = useAuth();

    const links = <>
        <li onClick={() => setOpen(false)} className='px-5 py-3 rounded-full duration-500'><NavLink to='/'>Home</NavLink></li>
        <li onClick={() => setOpen(false)} className='px-5 py-3 rounded-full duration-500'><NavLink to='/sendParcel'>Send Parcel</NavLink></li>
        <li onClick={() => setOpen(false)} className='px-5 py-3 rounded-full duration-500'><NavLink to='/coverage'>Coverage</NavLink></li>
        <li onClick={() => setOpen(false)} className='px-5 py-3 rounded-full duration-500'><NavLink to='/about'>About Us</NavLink></li>
        <li onClick={() => setOpen(false)} className='px-5 py-3 rounded-full duration-500'><NavLink to='/pricing'>Pricing</NavLink></li>
        <li onClick={() => setOpen(false)} className='px-5 py-3 rounded-full duration-500'><NavLink to='/beARider'>Be a Rider</NavLink></li>
        {
            user && (
                <li onClick={() => setOpen(false)} className='px-5 py-3 rounded-full duration-500'>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>
            )
        }
    </>

    const logOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Sign Out Your Account",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                logOutUser();
                setOpen(false);
            }
        });
    }

    return (
        <nav className='flex items-center justify-between py-5 md:px-8 px-4 bg-white rounded-lg relative'>

            {/* Logo */}
            <div>
                <Link>
                    <img src={logo} alt="" />
                </Link>
            </div>

            {/* Desktop Menu (unchanged) */}
            <div className='hidden lg:block'>
                <ul className='flex text-base font-medium text-base-gray items-center'>
                    {links}
                </ul>
            </div>

            {/* Desktop Buttons (unchanged) */}
            <div className='hidden lg:block'>
                {
                    user 
                    ? 
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={logOut}
                            className='text-lg font-bold px-6 py-2.5 border-input-text text-green-blue cursor-pointer rounded-xl border hover:bg-[#CAEB66] duration-500'
                        >
                            Log Out
                        </button>
                    </div> 
                    : 
                    <div className='flex items-center gap-4'>
                        <Link to='/login'>
                            <button className='text-lg font-bold px-6 py-2.5 border-input-text text-green-blue cursor-pointer rounded-xl border hover:bg-[#CAEB66] duration-500'>
                                LogIn
                            </button>
                        </Link>
                        <Link to='/register'>
                            <button className='text-lg font-bold px-6 py-2.5 border-input-text text-green-blue cursor-pointer rounded-xl border hover:bg-[#CAEB66] duration-500'>
                                Register
                            </button>
                        </Link>
                        <button className='p-3 bg-dark-blue rounded-full'>
                            <FiArrowUpRight className='text-[#CAEB66] text-2xl' />
                        </button>
                    </div>
                }
            </div>

            {/* 🔥 Mobile Menu Icon */}
            <div className="lg:hidden">
                <button onClick={() => setOpen(true)}>
                    <FiMenu className="text-3xl" />
                </button>
            </div>

            {/* 🔥 Overlay */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            ></div>

            {/* 🔥 Mobile Slide Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white z-50 p-5
                transform transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "translate-x-full"}`}
            >

                <div className="flex justify-end">
                    <button onClick={() => setOpen(false)}>
                        <FiX className="text-3xl" />
                    </button>
                </div>

                <ul className="mt-6 space-y-4 text-lg font-medium">
                    {links}
                </ul>

                <div className="mt-8 space-y-3">
                    {
                        user ? (
                            <button
                                onClick={logOut}
                                className="w-full py-2 border rounded-lg font-semibold"
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setOpen(false)}>
                                    <button className="w-full py-2 border rounded-lg">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register" onClick={() => setOpen(false)}>
                                    <button className="w-full py-2 border rounded-lg">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>

        </nav>
    );
};

export default NavBar;
