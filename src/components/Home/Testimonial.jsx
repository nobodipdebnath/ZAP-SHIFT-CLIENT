import React, { useEffect, useState } from "react";
import customer from "../../assets/customer-top.png";
import axios from "axios";
import ReviewCard from "./ReviewCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("./reviews.json").then((res) => setReviews(res.data));
  }, []);

  return (
    <div className="py-12">
      {/* Top Section */}
      <div className="flex flex-col justify-center items-center px-4">
        <img src={customer} alt="customer" className="w-24 md:w-28" />

        <h1 className="lg:text-[40px] text-3xl mt-5 font-extrabold text-green-blue text-center">
          What our customers are saying
        </h1>

        <p className="text-black-base mt-3 text-center max-w-2xl">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
          Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* Slider Section */}
      <div className="mt-10 px-4 relative">
        {/* Prev Button */}
        <button className="testimonial-prev absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow rounded-full p-3 hover:bg-green-100 transition cursor-pointer border-2 border-green-400">
          <FaAngleLeft className="text-2xl"></FaAngleLeft>
        </button>

        {/* Next Button */}
        <button className="testimonial-next absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow rounded-full p-3 hover:bg-green-100 transition cursor-pointer border-2 border-green-400">
          <FaAngleRight  className="text-2xl"/>
        </button>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          navigation={{ nextEl: ".testimonial-next", prevEl: ".testimonial-prev" }}
          autoplay={{ delay: 2500, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          loop={true}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="pb-10"
        >
          {reviews.map((singleReview) => (
            <SwiperSlide key={singleReview.id}>
              <ReviewCard singleReview={singleReview} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
