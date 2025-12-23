import React from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

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
        <div className='my-12 px-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>

                {/* Map */}
                <div>
                    <iframe className='w-full h-full rounded-xl' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3633.342169794899!2d88.51072007536511!3d26.130338093274634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4930051c4351d%3A0xb8a6d7ebd0b7ca35!2sNobodip%20Debnath%20Home!5e1!3m2!1sen!2sbd!4v1766490468027!5m2!1sen!2sbd"></iframe>
                </div>

                {/* Form */}
                <div className='bg-white p-8 rounded-xl'>
                    <h2 className='text-3xl font-bold mb-6'>Contact Us</h2>

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
                            className='bg-[#CAEB66] duration-500 cursor-pointer text-green-blue font-semibold px-6 py-3 rounded-lg hover:bg-[#cde680]'
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
