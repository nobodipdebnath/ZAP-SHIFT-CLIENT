import React from "react";
import { FaBox, FaClock, FaSmile, FaMapMarkedAlt, FaUsers } from "react-icons/fa";

const successMetrics = [
  {
    id: 1,
    icon: <FaBox className="text-green-600 text-4xl" />,
    title: "50,000+ Parcels Delivered",
  },
  {
    id: 2,
    icon: <FaClock className="text-green-600 text-4xl" />,
    title: "99% On-time Delivery",
  },
  {
    id: 3,
    icon: <FaSmile className="text-green-600 text-4xl" />,
    title: "10,000+ Satisfied Customers",
  },
  {
    id: 4,
    icon: <FaMapMarkedAlt className="text-green-600 text-4xl" />,
    title: "Nationwide Coverage",
  },
  {
    id: 5,
    icon: <FaUsers className="text-green-600 text-4xl" />,
    title: "Trusted by Businesses & Individuals",
  },
];

const Success = () => {
  return (
    <div className="px-6 md:px-16 my-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700">
          Our Success Stories
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          We take pride in our achievements and the trust our customers have placed in us.
        </p>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {successMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center"
          >
            <div className="mb-4">{metric.icon}</div>
            <h2 className="text-xl font-bold text-gray-800">{metric.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Success;
