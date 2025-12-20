import React from 'react';
import logo from '../../assets/footerlogo.png'
import { Link, NavLink } from 'react-router';
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
    const links = <>
        <li><NavLink to='/services'>services</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
        <li><NavLink to='/pricing'>Pricing</NavLink></li>
        <li><NavLink to='/blog'>Blog</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
    </>
    return (
        <div className='lg:px-28 px-5 py-8 lg:py-20 bg-dark-blue rounded-4xl'>
            <div className='flex items-center flex-col justify-center'>
                <div>
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div className='mt-4 mb-8 text-base text-dep-dark'>
                    <p className='text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
                </div>
                <div className='w-full border-t border-t-[#03464D] border-dashed'></div>
                <div className='py-8'>
                    <ul className='flex-col flex md:flex-row items-center gap-4 lg:gap-9 text-base font-medium text-white'>
                        {links}
                    </ul>
                </div>
                <div className='w-full border-t border-t-[#03464D] border-dashed'></div>
                <div className='flex gap-3 lg:gap-6 mt-8 items-center'>
                    <Link className='p-3 rounded-full bg-[#2489BE] shadow'>
                        <FaLinkedinIn></FaLinkedinIn>
                    </Link>
                    <Link className='p-3 rounded-full bg-white shadow'>
                        <FaXTwitter></FaXTwitter>
                    </Link>
                    <Link className='p-3 rounded-full bg-[#00B2FF] shadow'>
                        <FaFacebookF className='text-white'></FaFacebookF>
                    </Link>
                    <Link className='p-3 rounded-full bg-[#B71C1C] shadow'>
                        <FaYoutube className='text-white'></FaYoutube>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;