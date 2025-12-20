import React from 'react';
import { Link, Outlet } from 'react-router';
import authImage from '../assets/authImage.png'
import logo from '../assets/logo.png'

const AuthLayout = () => {
    return (
        <div className='grid md:grid-cols-2 h-screen'>
            <div className='bg-white'>
                <Link to='/'><img className='m-14' src={logo} alt="" /></Link>
                <div className='mt-14 mx-5 lg:mx-[20%]'>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className='bg-[#FAFDF0] flex justify-center items-center'>
                <img src={authImage} alt="" />
            </div>
        </div>
    );
};

export default AuthLayout;