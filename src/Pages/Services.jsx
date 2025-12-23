import React from "react";
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaBox,
  FaMoneyBillWave,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Parcel Collection",
    description:
      "We collect parcels directly from your home or business location with proper packaging support.",
    icon: <FaBox />,
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "Our optimized delivery system ensures fast and on-time parcel delivery across the city.",
    icon: <FaShippingFast />,
  },
  {
    id: 3,
    title: "Real-time Tracking",
    description:
      "Track your parcel live from pickup to delivery using our real-time tracking system.",
    icon: <FaMapMarkedAlt />,
  },
  {
    id: 4,
    title: "Cash on Delivery",
    description:
      "Customers can pay after receiving their parcel safely with our cash on delivery service.",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 5,
    title: "Secure Handling",
    description:
      "We ensure secure handling of parcels using trained riders and safety protocols.",
    icon: <FaShieldAlt />,
  },
  {
    id: 6,
    title: "24/7 Customer Support",
    description:
      "Our support team is available 24/7 to assist you with any delivery-related queries.",
    icon: <FaHeadset />,
  },
];

const Services = () => {
  return (
    <div className="px-6 md:px-16 my-14">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700">
          Our Services
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          We provide reliable, fast, and secure parcel delivery services
          tailored for individuals and businesses.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center"
          >
            <div className="text-green-600 text-5xl mb-4 flex justify-center">
              {service.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {service.title}
            </h2>
            <p className="mt-3 text-gray-600 text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
