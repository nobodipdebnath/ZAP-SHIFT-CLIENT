import React from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';
import { FiArrowUpRight } from "react-icons/fi";

const NavBar = () => {
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/services'>Services</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
        <li><NavLink to='/pricing'>Pricing</NavLink></li>
        <li><NavLink to='/ride'>Be a Rider</NavLink></li>
    </>
    return (
        <nav className='flex items-center justify-between py-5 px-8 bg-white rounded-lg'>
            <div>
                <Link><img src={logo} alt="" /></Link>
            </div>
            <ul className='flex text-base font-medium text-base-gray items-center gap-6'>
                {links}
            </ul>
            <div className='flex items-center gap-4'>
                <button className='text-xl font-bold text-base-gray px-8 py-4 rounded-xl border-[#DADADA] hover:bg-[#CAEB66] duration-500 hover:text-black border'>Sign In</button>
                <button className='text-xl font-bold text-base-gray px-8 py-4 rounded-xl border-[#DADADA] hover:bg-[#CAEB66] duration-500 hover:text-black border'>Be a rider</button>
                <button className='p-3 bg-dark-blue rounded-full'><FiArrowUpRight className='text-[#CAEB66] text-2xl '></FiArrowUpRight></button>
            </div>
        </nav>
    );
};

export default NavBar;