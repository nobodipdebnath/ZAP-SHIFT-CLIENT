import React from "react";
import { FaShippingFast, FaShieldAlt, FaSmile, FaMapMarkedAlt, FaUsers } from "react-icons/fa";

const missions = [
  {
    id: 1,
    icon: <FaShippingFast className="text-green-600 text-4xl" />,
    title: "Fast Delivery",
    description: "Deliver parcels quickly and on time across all locations.",
  },
  {
    id: 2,
    icon: <FaShieldAlt className="text-green-600 text-4xl" />,
    title: "Secure Handling",
    description: "Ensure parcels are handled carefully and safely throughout the journey.",
  },
  {
    id: 3,
    icon: <FaSmile className="text-green-600 text-4xl" />,
    title: "Customer Satisfaction",
    description: "Provide excellent service to ensure every customer is happy.",
  },
  {
    id: 4,
    icon: <FaMapMarkedAlt className="text-green-600 text-4xl" />,
    title: "Real-time Tracking",
    description: "Allow customers to track parcels live from pickup to delivery.",
  },
  {
    id: 5,
    icon: <FaUsers className="text-green-600 text-4xl" />,
    title: "Support Businesses & Individuals",
    description: "Cater to both personal and business parcel delivery needs.",
  },
];

const Mission = () => {
  return (
    <div className="px-6 md:px-16 my-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700">Our Mission</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          We are committed to providing fast, reliable, and secure parcel delivery services for our customers.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center"
          >
            <div className="mb-4">{mission.icon}</div>
            <h2 className="text-xl font-bold text-gray-800">{mission.title}</h2>
            <p className="mt-3 text-gray-600 text-sm">{mission.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mission;
