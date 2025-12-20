import React from 'react';
import AboutPage from '../Pages/AboutPage';
import { Outlet } from 'react-router';

const AboutLayout = () => {
    return (
        <div className='lg:py-20 py-8 px-5 lg:px-28 bg-white rounded-4xl my-8'>
            <AboutPage></AboutPage>
            <Outlet></Outlet>
        </div>
    );
};

export default AboutLayout;