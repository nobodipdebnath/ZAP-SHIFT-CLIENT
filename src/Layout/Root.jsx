import React from 'react';
import NavBar from '../components/Shared/NavBar';
import Footer from '../components/Shared/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className=' py-10 mt-0 mb-0 m-10'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;