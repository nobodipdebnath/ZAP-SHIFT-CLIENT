import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import Loading from '../Shared/Loading';

const SignIn = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const { logInUser, loading} = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const onSubmit = data => {
        logInUser(data.email, data.password)
        .then(result => {
            // if(!result.user?.emailVerified){
            //     Swal.fire({
            //         position: "center",
            //         icon: "success",
            //         title: "Please Verify your email !",
            //         showConfirmButton: false,
            //         timer: 1500
            //     });
            //     return;
            // }
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Log In Success 🥰",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, {replace: true});
        })
        .catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        });
    }
    
    if(loading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-[42px] font-extrabold text-black'>Welcome Back</h1>
            <p className='text-base text-black mt-1'>Register with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mt-6'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Email</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' {...register('email', {required: true})} type="Email" placeholder='Enter Your Email' />
                    {
                        errors.email?.type === 'required' && <p className='text-red-600'>Please Provide Email</p>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Password</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' {...register('password', {required: true, minLength: 8})} type="password" placeholder='Enter Your Password' />
                    {
                        errors.password?.type === 'required' && <p className='text-red-600'> Please Provide Your Password</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 8 cher longer</p>
                    }
                </div>
                <Link to='/forgotPassword'><p className='text-base text-[#8FA748] underline'>Forgot Password</p></Link>
                <div>
                    <button type='submit' className='py-3 w-full rounded-lg bg-[#CAEB66] text-base text-black font-semibold cursor-pointer'>LogIn</button>
                </div>
                <p className='text-base text-[#71717A]'>You have no account ? <Link to='/register' className='text-[#8FA748] underline'>Register</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default SignIn;