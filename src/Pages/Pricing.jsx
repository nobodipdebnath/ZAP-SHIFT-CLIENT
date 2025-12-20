import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const Pricing = () => {
  const serviceCenters = useLoaderData(); // ✅ Hook component এর ভিতরে
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      parcelType: "document",
      region: "",
      district: "",
      weight: "",
    },
  });

  const [price, setPrice] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  const parcelType = watch("parcelType");
  const weight = watch("weight");

  const districts = selectedRegion ? getDistrictsByRegion(selectedRegion) : [];

  const onSubmit = (data) => {
    let calculatedPrice = 0;

    if (data.parcelType === "document") {
      calculatedPrice = 80;
    } else {
      const w = parseFloat(data.weight);
      if (w <= 3) {
        calculatedPrice = 120;
      } else {
        calculatedPrice = 120 + (w - 3) * 30;
      }
    }

    setPrice(calculatedPrice);
  };

  const handleReset = () => {
    reset();
    setPrice(null);
    setSelectedRegion("");
  };

  return (
    <div className='lg:px-[108px] px-5 py-8 lg:py-20 bg-white rounded-3xl my-12'>
      <h1 className='lg:text-[56px] text-5xl text-center md:text-start leading-[110%] font-extrabold text-green-blue'>Pricing Calculator</h1>
      <p className='text-base text-black-base max-w-xl mt-4'>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <hr className='text-gray-400 my-12' />

      <div>
        <h3 className='text-center text-3xl font-extrabold text-green-blue md:mb-12'>Calculate Your Cost</h3>

        <div className="grid lg:mx-[100px] lg:grid-cols-2 md:gap-12">
          {/* Left: Form */}
          <div className="bg-white md:p-6 rounded-xl">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Parcel Type */}
              <div>
                <label className="block mb-1 font-medium">Parcel Type</label>
                <select
                  className="px-3 select outline-none py-2 border border-input-text rounded-lg  w-full"
                  {...register("parcelType", {required: true})}
                >
                  <option value="document">Document</option>
                  <option value="non-document">Non-Document</option>
                </select>
                {errors.parcelType && <p className="text-red-500 text-sm">Type is required</p>}
              </div>

              {/* Region */}
              <div>
                <label className="block mb-1 font-medium">Destination Region</label>
                <select
                  className="px-3 select outline-none py-2 border border-input-text rounded-lg  w-full"
                  {...register("region", {required: true})}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">Select a region</option>
                  {uniqueRegions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.region && <p className="text-red-500 text-sm">Type is required</p>}
              </div>

              {/* District */}
              <div>
                <label className="block mb-1 font-medium">Destination District</label>
                <select
                  className="px-3 select outline-none py-2 border border-input-text rounded-lg  w-full"
                  {...register("district", {required: true})}
                >
                  <option value="">Select a district</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="text-red-500 text-sm">Type is required</p>}
              </div>

              {/* Weight */}
              <div>
                <label className="block mb-1 font-medium">Parcel Weight (kg)</label>
                <input
                    type="number"
                    className={`w-full border border-input-text outline-none rounded-lg p-2 ${parcelType === "document" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    {...register("weight", { 
                    required: parcelType === "non-document" ? "Weight is required for non-document parcels" : false 
                    })}
                    placeholder={parcelType === "document" ? "Weight fixed" : "Enter weight"}
                    disabled={parcelType === "document"}
                />
                {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
            </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#b7c787] cursor-pointer duration-500 hover:bg-gray-500 text-white w-1/2 md:w-[25%] px-6 py-2.5 rounded-lg font-semibold"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-[#CAEB66] cursor-pointer duration-500 w-1/2 md:w-[75%] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Calculate
                </button>
              </div>
            </form>
          </div>

          {/* Right: Pricing Summary */}
          <div className="bg-white md:p-6 mt-8 md:mt-0 rounded-xl flex flex-col justify-center items-center">
            <h2 className="text-4xl text-green-blue font-bold text-center mb-4">Pricing Summary</h2>
            {price !== null ? (
              <p className="text-2xl text-green-blue font-bold">
                Total Price: <span className="text-green-600">{price} BDT</span>
              </p>
            ) : (
              <p className="text-gray-500 text-center">
                Please fill the form to calculate price
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
