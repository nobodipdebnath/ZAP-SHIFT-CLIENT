import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaClock,
  FaSmile,
  FaMapMarkedAlt,
  FaUsers,
  FaRedo,
  FaHandshake,
  FaStar,
} from "react-icons/fa";

// Animated Counter Component
const Counter = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value, duration]);

  return count.toLocaleString();
};

const successMetrics = [
  { id: 1, icon: <FaBox />, value: 50000, label: "Parcels Delivered" },
  { id: 2, icon: <FaClock />, value: 99, label: "On-time Delivery (%)" },
  { id: 3, icon: <FaSmile />, value: 10000, label: "Satisfied Customers" },
  { id: 4, icon: <FaMapMarkedAlt />, value: 64, label: "Districts Covered" },
  { id: 5, icon: <FaUsers />, value: 500, label: "Business Clients" },
  { id: 6, icon: <FaRedo />, value: 40, label: "Repeat Customers (%)" },
  { id: 7, icon: <FaHandshake />, value: 200, label: "Business Partners" },
  { id: 8, icon: <FaStar />, value: 4.9, label: "Average Rating" },
];

const Success = () => {
  return (
    <div className="px-6 md:px-16 py-16 my-12 bg-gradient-to-b from-white to-green-50 rounded-2xl">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-green-blue">
          Our Success Stories
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          We take pride in our achievements and the trust our customers have placed in us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {successMetrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 p-7 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-green-100 to-green-300 shadow-inner mb-3">
              <span className="text-3xl text-green-700">{metric.icon}</span>
            </div>

            <h2 className="text-3xl font-extrabold text-green-blue">
              <Counter value={metric.value} />{metric.value >= 100 ? "+" : ""}
            </h2>

            <p className="text-gray-600 mt-1 font-medium">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Success;
