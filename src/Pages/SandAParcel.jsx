import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useTrackingLogger from "../Layout/useTrackingLogger";
import useAuth from "../Hooks/useAuth";

const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const {logTracking} = useTrackingLogger()

    const serviceCenters = useLoaderData();
    // Extract unique regions
    const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];
    // Get districts by region
    const getDistrictsByRegion = (region) =>
        serviceCenters.filter((w) => w.region === region).map((w) => w.district);

    const parcelType = watch("type");
    const senderRegion = watch("sender_region");
    const receiverRegion = watch("receiver_region");

    const onSubmit = (data) => {
        const weight = parseFloat(data.weight) || 0;
        const isSameDistrict = data.sender_center === data.receiver_center;

        let baseCost = 0;
        let extraCost = 0;
        let breakdown = "";

        if (data.type === "document") {
            baseCost = isSameDistrict ? 60 : 80;
            breakdown = `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
        } else {
            if (weight <= 3) {
                baseCost = isSameDistrict ? 110 : 150;
                breakdown = `Non-document up to 3kg ${isSameDistrict ? "within" : "outside"} the district.`;
            } else {
                const extraKg = weight - 3;
                const perKgCharge = extraKg * 40;
                const districtExtra = isSameDistrict ? 0 : 40;
                baseCost = isSameDistrict ? 110 : 150;
                extraCost = perKgCharge + districtExtra;

                breakdown = `
        Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.<br/>
        Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
        ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
      `;
            }
        }

        const totalCost = baseCost + extraCost;

        Swal.fire({
            title: "Delivery Cost Breakdown",
            icon: "info",
            html: `
                <div class="text-left text-base space-y-2">
                    <p><strong>Parcel Type:</strong> ${data.type}</p>
                    <p><strong>Weight:</strong> ${weight} kg</p>
                    <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>
                    <hr class="my-2"/>
                    <p><strong>Base Cost:</strong> ৳${baseCost}</p>
                    ${extraCost > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>` : ""}
                    <div class="text-gray-500 text-sm">${breakdown}</div>
                    <hr class="my-2"/>
                    <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
                </div>
                `,
                showDenyButton: true,
                confirmButtonText: "💳 Proceed to Payment",
                denyButtonText: "✏️ Continue Editing",
                confirmButtonColor: "#16a34a",
                denyButtonColor: "#d3d3d3",
                customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const tracking_id = generateTrackingID()
                const parcelData = {
                    ...data,
                    cost: totalCost,
                    created_by: user.email,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: tracking_id,
                };
                navigate('/dashboard/myParcels')

                // console.log("Ready for payment:", parcelData);

                axiosSecure.post('/parcels', parcelData)
                    .then(async (result) => {
                        // console.log(result.data.insertedId);
                        if (result.data?.data?.insertedId) {
                            Swal.fire({
                                title: "Redirecting...",
                                text: "Proceeding to payment gateway.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });

                            await logTracking({
                                tracking_id: parcelData.tracking_id,
                                status: "parcel_created",
                                details: `Created by ${user.displayName}`,
                                updated_by: user.email,
                            })
                        }
                    })

            }
        });
    };

    return (
        <div className="lg:py-20 py-8 px-3 lg:px-28 bg-white rounded-4xl my-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Heading */}
                <h1 className="lg:text-[56px] text-5xl font-extrabold  text-green-blue">Add Parcel</h1>
                <hr className="text-gray-400 my-6" />

                {/* Parcel Info */}
                <div className="">
                    <h3 className="text-[28px] font-extrabold text-green-blue">Enter your parcel details</h3>
                    <div className="">
                        {/* Type */}
                        <div className="mt-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <label className="flex items-center text-base font-semibold text-green-blue gap-2">
                                    <input
                                        type="radio"
                                        value="document"
                                        {...register("type", { required: true })}
                                        className="radio"
                                    />
                                    Document
                                </label>
                                <label className="flex text-base font-semibold text-green-blue  items-center gap-2">
                                    <input
                                        type="radio"
                                        value="non-document"
                                        {...register("type", { required: true })}
                                        className="radio"
                                    />
                                    Non-Document
                                </label>
                            </div>
                            {errors.type && <p className="text-red-500 text-sm">Type is required</p>}
                        </div>
                        <div className="grid mt-7.5 md:grid-cols-2 gap-4 md:gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0F172A]">Parcel Name</label>
                                <input
                                    {...register("title", { required: true })}
                                    className="py-2 w-full rounded-lg outline-none border-[#94A3B8] border px-3 placeholder:text-[#94A3B8]"
                                    placeholder="Parcel Name"
                                />
                                {errors.title && <p className="text-red-500 text-sm">Parcel name is required</p>}
                            </div>
                            {/* Weight */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0F172A]">Weight (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register("weight")}
                                    disabled={parcelType !== "non-document"}
                                    className={`px-3 w-full py-2 border border-[#94A3B8] rounded-lg placeholder:text-[#94A3B8] outline-none ${parcelType !== "non-document" ? "bg-gray-100 cursor-not-allowed" : ""
                                        }`}
                                    placeholder="Enter weight"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="text-gray-400 my-6" />


                {/* Sender & Receiver Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Sender Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-extrabold text-green-blue">Sender Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Name</label>
                                    <input {...register("sender_name", { required: true })} className=" py-2 px-3 border border-input-text rounded-lg placeholder:text-input-text outline-none w-full" value={user.displayName} placeholder="Name" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Contact Number</label>
                                    <input {...register("sender_contact", { required: true })} className=" py-2 px-3 border border-input-text rounded-lg placeholder:text-input-text outline-none w-full" placeholder="Contact" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Your Region</label>
                                    <select {...register("sender_region", { required: true })} className="px-3 select outline-none py-2 border border-input-text rounded-lg  w-full">
                                        <option value="">Select Region</option>
                                        {uniqueRegions.map((region) => (
                                            <option  key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Sender Pickup Wire house</label>
                                    <select {...register("sender_center", { required: true })} className="px-3 select outline-none py-2 border border-input-text rounded-lg  w-full">
                                        <option value="">Select Service Center</option>
                                        {getDistrictsByRegion(senderRegion).map((district) => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-input-label text-base">Address</label>
                                <input {...register("sender_address", { required: true })} className="py-2 px-3 border border-input-text rounded-lg outline-none w-full" placeholder="Address" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-input-label text-base">Pickup Instruction</label>
                                <textarea {...register("pickup_instruction", { required: true })} rows={3} cols={3} className=" border border-input-text rounded-lg outline-none py-2 px-3 w-full" placeholder="Pickup Instruction" />
                            </div>     
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-extrabold text-green-blue">Receiver Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Name</label>
                                    <input {...register("receiver_name", { required: true })} className="py-2 px-3 border border-input-text rounded-lg outline-none w-full" placeholder="Name" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Contact</label>
                                    <input {...register("receiver_contact", { required: true })} className="py-2 px-3 border border-input-text rounded-lg outline-none w-full" placeholder="Contact" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Receiver Region</label>
                                    <select {...register("receiver_region", { required: true })} className="px-3 select outline-none py-2 border border-input-text rounded-lg  w-full">
                                        <option value="">Select Region</option>
                                        {uniqueRegions.map((region) => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-input-label text-base">Receiver Delivery Wire house</label>
                                    <select {...register("receiver_center", { required: true })} className="px-3 select outline-none py-2 border border-input-text rounded-lg  w-full">
                                        <option value="">Select Service Center</option>
                                        {getDistrictsByRegion(receiverRegion).map((district) => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-input-label text-base">Address</label>
                                <input {...register("receiver_address", { required: true })} className="py-2 px-3 border border-input-text rounded-lg outline-none w-full" placeholder="Address" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-input-label text-base">Delivery Instruction</label>
                                <textarea {...register("delivery_instruction", { required: true })} rows={3} cols={3} className=" border border-input-text rounded-lg outline-none py-2 px-3 w-full" placeholder="Delivery Instruction" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-start">
                    <p className="text-black text-base my-8">* PickUp Time~4pm-7pm~Approx.</p>
                    <button type="submit" className="py-2 px-14 bg-[#CAEB66] rounded-lg font-medium cursor-pointer text-black">Proceed to Confirm Booking</button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;