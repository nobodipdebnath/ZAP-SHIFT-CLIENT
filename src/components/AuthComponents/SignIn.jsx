import React from 'react';
import { Link } from 'react-router';
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    return (
        <div>
            <h1 className='text-[42px] font-extrabold text-black'>Welcome Back</h1>
            <p className='text-base text-black mt-1'>Register with Profast</p>
            <form className='flex flex-col gap-3 mt-6'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Email</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' type="Email" placeholder='Enter Your Email' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Password</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' type="password" placeholder='Enter Your Password' />
                </div>
                <div>
                    <button type='submit' className='py-3 w-full rounded-lg bg-[#CAEB66] text-base text-black font-semibold cursor-pointer'>LogIn</button>
                </div>
                <p className='text-base text-[#71717A]'>You have no account ? <Link to='/register' className='text-[#8FA748] underline'>Register</Link></p>
                <div className='divider text-[#71717A]'>or</div>
                <div>
                    <button className='flex items-center justify-center bg-[#E9ECF1] gap-2 w-full py-3 rounded-lg cursor-pointer'>
                        <FcGoogle></FcGoogle>
                        <p className='text-base font-semibold text-black'>Sign in With Google</p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;