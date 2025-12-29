import React from "react";
import { FaFlag, FaBullseye, FaHeart, } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";

const storySections = [
  {
    id: 1,
    title: "Our Beginning",
    description: "Parcel Delivery App was founded with a vision to provide fast, reliable, and secure parcel delivery for individuals and businesses across the country.",
    icon: <FaFlag />,
    image: null,
  },
  {
    id: 2,
    title: "Our Mission",
    description: "We are committed to delivering parcels safely and on time while ensuring customer satisfaction and real-time tracking.",
    icon: <FaBullseye />,
    image: null,
  },
  {
    id: 3,
    title: "Our Values",
    description: "Integrity, reliability, professionalism, and innovation guide everything we do.",
    icon: <FaHeart />,
    image: null,
  },
  {
    id: 4,
    title: "Achievements",
    description: "Delivered 50,000+ parcels, maintained 99% on-time delivery rate, and earned the trust of thousands of happy customers.",
    icon: <FaTrophy />,
    image: null,
  },
];

const Story = () => {
  return (
    <div className="md:px-6 lg:px-16 py-16 my-12 bg-gradient-to-b from-white to-green-50 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-green-blue">Our Story</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Learn about how we started, our mission, values, and achievements.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-12">
        {/* Center Line */}
        <span className="absolute left-1/2 top-0 h-full w-[3px] bg-green-200 -translate-x-1/2 hidden md:block" />

        {storySections.map((section, index) => (
          <div
            key={section.id}
            className={`flex flex-col md:flex-row items-center gap-6 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Card */}
            <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-4 lg:p-7">
              <div className="flex items-center gap-3 mb-3">
                {/* Icon / Image */}
                {section.image ? (
                  <img
                    src={section.image}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover shadow"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-700 text-2xl shadow-inner">
                    {section.icon}
                  </div>
                )}

                <h2 className="text-2xl font-bold text-green-blue">
                  {section.title}
                </h2>
              </div>

              <p className="text-gray-600">{section.description}</p>
            </div>

            {/* Dot */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-green-600 ring-8 ring-green-200" />
            </div>

            {/* Spacer */}
            <div className="hidden md:block w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Story;
