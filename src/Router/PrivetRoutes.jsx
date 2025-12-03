import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoutes = ({children}) => {
    const {loading, user} = useAuth();
    let location = useLocation();

    if(loading){
        return <p>Loading .........</p>
    }

    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default PrivetRoutes;