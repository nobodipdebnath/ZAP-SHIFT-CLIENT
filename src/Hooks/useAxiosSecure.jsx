import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';
const axiosSecure = axios.create({
    baseURL: `https://zap-shift-server-ten-pi.vercel.app`
})

const useAxiosSecure = () => {
    const {user, logOutUser} = useAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config;
    }, error=> {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        // console.log('inside error interceptors', error.status);
        const status = error.status;
        if(status === 403){
            return navigate('/forbidden')
        }
        else if(status === 401){
            logOutUser()
            .then(() => {
                navigate('/login')
            })
            .catch(() => {

            })
            
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;