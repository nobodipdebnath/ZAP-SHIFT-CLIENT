import React from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const googleSignIn = () => {
        signInWithGoogle()
        .then(async (result) => {
            const user = result.user;

            const userInfo = {
                email: user.email,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
            }

            const res = await axiosInstance.post('/users',userInfo);
            console.log('User update in database',res.data);

            if(result.user){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Google Login Success ",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from);
                return;
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div>
            <div className='divider text-[#71717A]'>or</div>
            <div>
                <button onClick={googleSignIn} className='flex items-center justify-center bg-[#E9ECF1] gap-2 w-full py-3 rounded-lg cursor-pointer'>
                    <FcGoogle></FcGoogle>
                    <p className='text-base font-semibold text-black'>Sign in With Google</p>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;