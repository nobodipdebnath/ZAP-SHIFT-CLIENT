import React, { useState } from "react";
import { Truck, Shield, Smile, MapPin, Users, Leaf, Clock, Handshake, Smartphone, Globe, Award, Headphones, ChevronLeft, ChevronRight } from "lucide-react";

const missions = [
  {
    id: 1,
    icon: Truck,
    title: "Fast Delivery",
    description: "Deliver parcels quickly and on time across all locations.",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    image: "https://i.ibb.co.com/KzbR8b6F/OIP.webp",
  },
  {
    id: 2,
    icon: Shield,
    title: "Secure Handling",
    description: "Ensure parcels are handled carefully and safely throughout the journey.",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    image: "https://i.ibb.co.com/wFQRgFVh/OIP-1.webp",
  },
  {
    id: 3,
    icon: Smile,
    title: "Customer Satisfaction",
    description: "Provide excellent service to ensure every customer is happy.",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    image: "https://i.ibb.co.com/TBSjhpjJ/tools-to-measure-the-level-of-customer-satisfaction-with-the-service-of-employees-vector.jpg",
  },
  {
    id: 4,
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Allow customers to track parcels live from pickup to delivery.",
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-50",
    image: "https://i.ibb.co.com/Jj0C9Fv3/DALL-E-2024-12-11-21-12-11-A-modern-clean-and-professional-featured-image-for-an-article-about-What.webp",
  },
  {
    id: 5,
    icon: Users,
    title: "Support Businesses & Individuals",
    description: "Cater to both personal and business parcel delivery needs.",
    color: "from-indigo-400 to-blue-500",
    bgColor: "bg-indigo-50",
    image: "https://i.ibb.co.com/pr3Vq7NK/OIP-2.webp",
  },
  {
    id: 6,
    icon: Leaf,
    title: "Eco-Friendly Operations",
    description: "Use sustainable practices and green vehicles to reduce environmental impact.",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-teal-50",
    image: "https://i.ibb.co.com/prjGY4rH/sustainability-green-initiatives-and-eco-friendly-practices-free-photo.jpg",
  },
  {
    id: 7,
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Offer convenient pickup and delivery time slots that fit your schedule.",
    color: "from-rose-400 to-red-500",
    bgColor: "bg-rose-50",
    image: "https://i.ibb.co.com/DfHYw2bg/flexible-schedule-handwritten-memo-on-the-calendar-1202291839-9864ad4e70cc4a49be1d2dafb0695dac.jpg",
  },
  {
    id: 8,
    icon: Handshake,
    title: "Trusted Partnerships",
    description: "Build lasting relationships with reliable courier partners and vendors.",
    color: "from-amber-400 to-yellow-600",
    bgColor: "bg-amber-50",
    image: "https://i.ibb.co.com/dJcYV6wt/two-business-man-shaking-hand-for-partnership-ai-generated-photo.jpg",
  },
  {
    id: 9,
    icon: Smartphone,
    title: "Easy Mobile Access",
    description: "Manage deliveries effortlessly through our user-friendly mobile app.",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50",
    image: "https://i.ibb.co.com/2YW5bP1W/My-Kumon-App-Article-05.webp",
  },
  {
    id: 10,
    icon: Globe,
    title: "Nationwide Coverage",
    description: "Reach every corner of the country with our extensive delivery network.",
    color: "from-emerald-400 to-green-600",
    bgColor: "bg-emerald-50",
    image: "https://i.ibb.co.com/m52yxHKg/OIP-3.webp",
  },
  {
    id: 11,
    icon: Award,
    title: "Quality Assurance",
    description: "Maintain the highest standards in every step of the delivery process.",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-50",
    image: "https://i.ibb.co.com/BKKbBN6w/OIP-4.webp",
  },
  {
    id: 12,
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help anytime with our round-the-clock customer support team.",
    color: "from-fuchsia-400 to-pink-500",
    bgColor: "bg-fuchsia-50",
    image: "https://i.ibb.co.com/1GJv87TY/istockphoto-1494073880-170667a.jpg",
  },
];

const Mission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMissions = missions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(missions.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="md:px-6 lg:px-16 my-16 bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
            Our Mission
          </h1>
          <div className="h-1 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"></div>
        </div>
        <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          We are committed to providing fast, reliable, and secure parcel delivery services that exceed expectations.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
        {currentMissions.map((mission, index) => {
          const Icon = mission.icon;
          return (
            <div
              key={mission.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={mission.image} 
                  alt={mission.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon overlay on image */}
                <div className="absolute top-4 right-4">
                  <div className={`${mission.bgColor} p-3 rounded-xl backdrop-blur-sm bg-opacity-90`}>
                    <Icon className="w-6 h-6 text-gray-700" strokeWidth={2} />
                  </div>
                </div>
              </div>
              
              <div className="relative p-6 flex flex-col text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                  {mission.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mission.description}
                </p>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${mission.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-green-600 hover:bg-green-50 shadow-md hover:shadow-lg'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                currentPage === pageNumber
                  ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 shadow-md hover:shadow-lg'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        
        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-green-600 hover:bg-green-50 shadow-md hover:shadow-lg'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Page Info */}
      <p className="text-center mt-4 text-gray-600 text-sm">
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, missions.length)} of {missions.length} missions
      </p>
    </div>
  );
};

export default Mission;