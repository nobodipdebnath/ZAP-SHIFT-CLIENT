import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Shared/Loading';

const PrivetRoutes = ({children}) => {
    const {loading, user} = useAuth();
    let location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default PrivetRoutes;