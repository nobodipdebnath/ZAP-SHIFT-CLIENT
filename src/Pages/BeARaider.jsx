import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { useState } from "react";
import { useLoaderData } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import raider from '../assets/raider.png'


const BeARider = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [selectedRegion, setSelectedRegion] = useState("");
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();

    const regions = [...new Set(serviceCenters.map((s) => s.region))];
    const districts = serviceCenters
        .filter((s) => s.region === selectedRegion)
        .map((s) => s.district);

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name: user?.displayName || "",
            email: user?.email || "",
            status: "pending",
            created_at: new Date().toISOString(),
        };

        console.log("Rider Application:", riderData);

        axiosSecure.post('/riders', riderData)
            .then(res => {
                console.log(res)
                if(res){
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "Your application is pending approval.",
                    });
                }
            })



        // Send to your backend here
        reset();
    };

    return (
        <div className="lg:py-20 py-8 lg:px-28 px-5 bg-white rounded-4xl my-8">
            <h2 className="lg:text-[56px] text-5xl text-center md:text-start font-extrabold text-green-blue">Become a Rider</h2>
            <p className="max-w-3xl text-base text-black-base mt-4">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <hr className="text-gray-300 my-12" />
            <h2 className="text-[28px] font-extrabold text-green-blue">Tell us about yourself</h2>
            <div className="grid gide-cols-1 items-center lg:grid-cols-2 mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                    {/* Name (read-only) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 ">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="w-full px-3 py-2 border border-input-text rounded-lg placeholder:text-input-text outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full px-3 py-2 border border-input-text rounded-lg placeholder:text-input-text outline-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">Age</label>
                                <input
                                    type="number"
                                    placeholder="Your Age"
                                    className="w-full px-3 py-2 border border-input-text rounded-lg placeholder:text-input-text outline-none"
                                    {...register("age", { required: true, min: 18 })}
                                />
                                {errors.age && (
                                    <span className="text-red-500 text-sm">You must be 18 or older</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-3 py-2 border border-input-text rounded-lg placeholder:text-input-text outline-none"
                                    {...register("phone", { required: true })}
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-sm">Phone number is required</span>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">Region</label>
                                <select
                                    className="select border border-input-text rounded-lg outline-none w-full"
                                    {...register("region", { required: true })}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((region, idx) => (
                                        <option key={idx} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                                {errors.region && <span className="text-red-500 text-sm">Region is required</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">District</label>
                                <select
                                    className="select border border-input-text rounded-lg outline-none w-full"
                                    {...register("district", { required: true })}
                                    disabled={!selectedRegion}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district, idx) => (
                                        <option key={idx} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <span className="text-red-500 text-sm">District is required</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">Bike Brand</label>
                                <input
                                    type="text"
                                    placeholder="Bike Brand (e.g., Yamaha FZ)"
                                    className="w-full px-3 py-2 border border-input-text rounded-lg placeholder:text-input-text outline-none"
                                    {...register("bike_brand", { required: true })}
                                />
                                {errors.bike_brand && (
                                    <span className="text-red-500 text-sm">Bike brand is required</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-input-label">Bike Registration </label>
                                <input
                                    type="text"
                                    placeholder="Bike Registration Number"
                                    className="w-full px-3 py-2 border border-input-text rounded-lg placeholder:text-input-text outline-none"
                                    {...register("bike_registration", { required: true })}
                                />
                                {errors.bike_registration && (
                                    <span className="text-red-500 text-sm">Registration number is required</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-normal text-input-label">NID Number</label>
                            <input
                                type="text"
                                placeholder="National ID Card Number"
                                className="w-full px-3 py-2 border border-input-text rounded-lg placeholder:text-input-text outline-none"
                                {...register("nid", { required: true })}
                            />
                            {errors.nid && (
                                <span className="text-red-500 text-sm">NID is required</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-normal text-input-label">Additional information</label>
                            <textarea cols={3} rows={3}
                            placeholder="Additional information (optional)"
                            className="py-2 px-3 border border-input-text rounded-lg w-full"
                            {...register("note")}
                            ></textarea>
                        </div>
                    </div>
                    <button type="submit" className="py-2.5 bg-[#CAEB66] rounded-lg cursor-pointer text-sm font-semibold text-green-blue w-full mt-4">
                    Submit Rider Application
                    </button>
                </form>
                <div className="lg:ml-25">
                    <img src={raider} alt="" />
                </div>
            </div>
        </div>
    );
};

export default BeARider;