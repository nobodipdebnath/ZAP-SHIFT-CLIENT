import React from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { IoMdCall } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post("/contact", data);

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent!",
                    text: "Your message has been sent successfully.",
                    confirmButtonColor: "#16a34a",
                });
                reset();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Failed to send message. Please try again.",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    return (
        <div className='my-12 bg-white rounded-3xl md:py-12 py-8 px-2 md:px-10'>
            <h1 className='text-center text-4xl md:text-6xl font-extrabold text-green-blue'>Contact Us</h1>
            <div className='mt-8'>
                <div>
                    <iframe className='w-full h-[500px] rounded-xl' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3633.342169794899!2d88.51072007536511!3d26.130338093274634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4930051c4351d%3A0xb8a6d7ebd0b7ca35!2sNobodip%20Debnath%20Home!5e1!3m2!1sen!2sbd!4v1766490468027!5m2!1sen!2sbd"></iframe>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-8 gap-7'>

                {/* Map */}
                <div className='w-full h-full border rounded-2xl p-3 md:p-12 border-input-text flex flex-col gap-4 md:gap-6'>
                    <div className='flex items-center gap-2'>
                        <div className='p-3 rounded-full text-green-blue bg-[#CAEB66] text-xl'>
                            <IoMdCall></IoMdCall>
                        </div>
                        <p className='md:text-xl text-lg font-medium text-input-label hover:underline cursor-pointer'>+880 131220 3474</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='p-3 rounded-full text-green-blue bg-[#CAEB66] text-xl'>
                            <IoIosMail></IoIosMail>
                        </div>
                        <p className='md:text-xl text-lg font-medium text-input-label hover:underline cursor-pointer'>zapshift@gmail.com</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='p-3 rounded-full text-green-blue bg-[#CAEB66] text-xl'>
                            <FaFacebookF></FaFacebookF>
                        </div>
                        <p className='md:text-xl text-lg font-medium text-input-label hover:underline cursor-pointer'>Zap Shift parcel Delivery Ltd.</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='p-3 rounded-full text-green-blue bg-[#CAEB66] text-xl'>
                            <FaInstagram></FaInstagram>
                        </div>
                        <p className='md:text-xl text-lg font-medium text-input-label hover:underline cursor-pointer'>Zap Shift parcel Delivery Ltd.</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='p-3 rounded-full text-green-blue bg-[#CAEB66] text-xl'>
                            <FaTwitter></FaTwitter>
                        </div>
                        <p className='md:text-xl text-lg font-medium text-input-label hover:underline cursor-pointer'>Zap Shift parcel Delivery Ltd.</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='p-3 rounded-full text-green-blue bg-[#CAEB66] text-xl'>
                            <FaLinkedinIn></FaLinkedinIn>
                        </div>
                        <p className='md:text-xl text-lg font-medium text-input-label hover:underline cursor-pointer'>Zap Shift parcel Delivery Ltd.</p>
                    </div>
                </div>

                {/* Form */}
                <div className='bg-white p-3 md:p-8  border border-input-text rounded-2xl'>
                    <h2 className='text-center font-extrabold text-4xl text-green-blue mb-4'>Touch on it</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className='w-full py-3 px-5 outline-none border border-input-text rounded-lg placeholder:text-input-text'
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className='w-full py-3 px-5 outline-none border border-input-text rounded-lg placeholder:text-input-text'
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email"
                                    }
                                })}
                            />
                            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <textarea
                                rows="5"
                                placeholder="Write your message"
                                className='w-full border rounded-lg p-3 outline-none border-input-text placeholder:text-input-text'
                                {...register("message", { required: "Message is required" })}
                            ></textarea>
                            {errors.message && <p className='text-red-500 text-sm'>{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className='bg-[#CAEB66] duration-500 cursor-pointer text-green-blue font-semibold px-6 py-3 w-full md:w-auto rounded-lg hover:bg-[#cde680]'
                        >
                            Send Message
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
