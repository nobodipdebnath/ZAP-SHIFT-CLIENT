import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import Loading from '../Shared/Loading';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createAccount, emailVerify, loading, updateUserProfile} = useAuth();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState('')
    const axiosInstance = useAxios();

    const onSubmit = (data) => {
        createAccount(data.email, data.password)
        .then( async (result) => {

            // Update userInfo in the database

            const userInfo = {
                email: data.email,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            }

            const userRes = await axiosInstance.post('/users', userInfo);
            console.log(userRes.data);

            // Update user info in firebase

            const userProfile = {
                displayName: data.name,
                photoURL: profilePic,

            }
            updateUserProfile(userProfile)
            .then(()=>{
                console.log('Profile pic update');
            })
            .catch(error  => {
                console.log(error);
            })

            emailVerify(result.user)
            .then(()=> {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Please Verify your email !",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login')
            })
            
        })
        .catch(error=> {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        })
    }
    if(loading){
        return <Loading></Loading>
    }

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        // console.log(image);
        const formData = new FormData();
        formData.append('image',image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imageUploadUrl, formData)

        setProfilePic(res.data.data.url);
    }

    return (
        <div>
            <h1 className='text-[42px] font-extrabold text-black'>Create an Account</h1>
            <p className='text-base text-black mt-1'>Register with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mt-6'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Photo URl</label>
                    <input onChange={handleImageUpload} className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' type="file" placeholder='Enter Your Profile Image' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Name</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' type="text" {...register('name', {required: true})}placeholder='Enter Your Name' />
                    {
                        errors.name?.type === 'required' && <p className='text-red-600'>Please Provide Your Name</p>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Email</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' type="Email" {...register('email', {required: true})}
                    placeholder='Enter Your Email' />

                    {
                        errors.email?.type === 'required' && <p className='text-red-600'>Email is required</p>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#0F172A] font-medium'>Password</label>
                    <input className='py-3 px-4 border rounded-lg border-[#CBD5E1] outline-none w-full' type="password" {...register('password',{
                        required: true,
                        minLength: 8
                    })}placeholder='Enter Your Password' />

                    {
                        errors.password?.type === 'required' && <p className='text-red-600'>
                            Password is required
                        </p>
                    }
                    {
                        errors.password?.type === 'minLength' &&<p className='text-red-600'>
                            Password must be 8 cher
                        </p>
                    }
                </div>
                <div>
                    <button type='submit' className='py-3 w-full rounded-lg bg-[#CAEB66] text-base text-black font-semibold cursor-pointer'>Register</button>
                </div>
                <p className='text-base text-[#71717A]'>You have already account ? <Link to='/login' className='text-[#8FA748] underline'>Log In</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;