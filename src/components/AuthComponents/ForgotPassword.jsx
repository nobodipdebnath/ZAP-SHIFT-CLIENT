import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const ForgotPassword = () => {
    const{register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = data => {
        console.log(data);
    }
    return (
        <div>
            <h1 className='text-[42px] font-extrabold text-black'>Forgot Password</h1>
            <p className='text-base text-black mt-1'>Enter your email address and we’ll send you a reset link.</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-6'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Email</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' {...register('email', {required: true})} type="Email" placeholder='Enter Your Email' />
                    {
                        errors.email?.type === 'required' && <p className='text-red-600'>Please Provide Email</p>
                    }
                </div>
                <div>
                    <button type='submit' className='py-3 w-full rounded-lg bg-[#CAEB66] text-base text-black font-semibold cursor-pointer'>Send</button>
                </div>
                <p className='text-base text-[#71717A]'>You have already account ? <Link to='/login' className='text-[#8FA748] underline'>Log In</Link></p>
            </form>
        </div>
    );
};

export default ForgotPassword;