import useAuth from '../Hooks/useAuth';
import Loading from '../components/Shared/Loading';
import useUserRole from '../Hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {

    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();
    let location = useLocation();

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(!user || role !== 'admin'){
        return <Navigate state={{from: location.pathname}} to='/forbidden'></Navigate>
    }

    return children;
};

export default AdminRoute;