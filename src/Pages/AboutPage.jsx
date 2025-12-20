import React from 'react';
import AboutLayout from '../Layout/AboutLayout';
import { Link } from 'react-router';

const AboutPage = () => {
    return (
        <div >
            <h1 className='text-[56px] font-extrabold text-green-blue'>About Us</h1>
            <p className='text-base text-black-base max-w-3xl'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <hr  className='my-12 text-gray-400'/>
            <ul className='flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-12  font-semibold text-lg text-black-base'>
                <li><Link>Story</Link></li>
                <li><Link to='/about/mission'>Mission</Link></li>
                <li><Link to='/about/success'>Success</Link></li>
                <li><Link to='/about/team'>Team & Others</Link></li>
            </ul>
        </div>
    );
};

export default AboutPage;