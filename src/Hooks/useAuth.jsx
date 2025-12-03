import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const useAuth = () => {
    const userData = use(AuthContext);
    return userData;
};

export default useAuth;