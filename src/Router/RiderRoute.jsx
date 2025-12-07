import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../components/Shared/Loading';
import { Navigate, useLocation } from 'react-router';

const RiderRoute = ({children}) => {
    const location  = useLocation();
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(!user || role !== 'rider'){
        return <Navigate state={{from: location.pathname}} to='/forbidden'></Navigate>
    }
    return children;
};

export default RiderRoute;