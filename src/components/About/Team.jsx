import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Mail } from "lucide-react";

// Example team data
const teamMembers = [
  {
    id: 1,
    name: "Nobodip Debnath",
    role: "CEO & Founder",
    image: "https://i.ibb.co.com/mrZXsm4j/Screenshot-2024-06-23-102949.png",
  },
  {
    id: 2,
    name: "MD Murad",
    role: "Operations Manager",
    image:
      "https://i.ibb.co.com/2YsZj2Ky/524968217-1375390253550397-2143126781331599520-n.jpg",
  },
  {
    id: 3,
    name: "MD Rana Islam",
    role: "Delivery Manager",
    image:
      "https://i.ibb.co.com/rKbLHbsc/481452150-122234052176027349-1257594455478964426-n.jpg",
  },
  {
    id: 4,
    name: "MD Masud Rana",
    role: "Customer Support Lead",
    image:
      "https://i.ibb.co.com/60SZ3WMj/486636420-1878898449544894-3129450576927765247-n.jpg",
  },
  {
    id: 5,
    name: "Kanita Jahan",
    role: "Delivery Team",
    image: "https://i.ibb.co.com/d4ChphgV/kanita.jpg",
  },
  {
    id: 6,
    name: "Nifad Zaman",
    role: "Delivery Team",
    image: "https://i.ibb.co.com/svN9yPz7/501022075-728724229662155-8956302690168876055-n.jpg",
  },
  {
    id: 7,
    name: "Rontu Mohonto",
    role: "Marketing Manager",
    image: "https://i.ibb.co.com/bRryK6N0/558747830-122122467320980012-8661329893000360268-n.jpg",
  },
  {
    id: 8,
    name: "Bijoy Roy",
    role: "HR Manager",
    image: "https://i.ibb.co.com/FL2ywwZp/486600052-1169306098320667-7006547963581715242-n.jpg",
  },
  {
    id: 9,
    name: "Nusrat Jahan Oni",
    role: "Call Executive",
    image: "https://i.ibb.co.com/N2K837Vt/Whats-App-Image-2025-12-26-at-10-30-03-PM.jpg",
  },
  {
    id: 10,
    name: "Nahid Islam",
    role: "Finance Manager",
    image: "https://i.ibb.co.com/wZT4k1Cf/513877341-1220725593028308-1290451784703447551-n.jpg",
  },
  {
    id: 11,
    name: "Md Soroardi Islam ",
    role: "Creative Designer",
    image: "https://i.ibb.co.com/B2nbwQSg/Screenshot-2025-12-24-171606.png",
  },
];

const Team = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 6;

  // Pagination Logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = teamMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const totalPages = Math.ceil(teamMembers.length / membersPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="lg:px-16 md:px-6 my-12 bg-gradient-to-b from-white to-gray-50 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Meet Our Team
          </h1>
          <div className="h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full"></div>
        </div>
        <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Our professional team ensures safe, fast, and reliable parcel delivery
          for all customers.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
        {currentMembers.map((member, index) => (
          <div
            key={member.id}
            className="group relative py-8 p-4 lg:px-10 bg-white shadow-lg hover:shadow-2xl rounded-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            
            <div className="relative">
              {/* Image with border and gradient ring */}
              <div className="relative mx-auto w-[200px] h-[200px] md:w-[250px] md:h-[250px]">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative rounded-full h-full w-full border-4 border-white shadow-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Online status indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              {/* Member Info */}
              <div className="flex items-center justify-center flex-col mt-6">
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-blue-600 transition-all">
                  {member.name}
                </h2>
                <p className="text-base font-medium text-gray-600 mt-1">
                  {member.role}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <Mail className="w-5 h-5 text-green-600" />
                  </button>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-green-600 hover:bg-green-50 shadow-md hover:shadow-lg"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => paginate(idx + 1)}
            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
              currentPage === idx + 1
                ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg transform scale-110"
                : "bg-white text-gray-700 hover:bg-green-50 shadow-md hover:shadow-lg"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-green-600 hover:bg-green-50 shadow-md hover:shadow-lg"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Page Info */}
      <p className="text-center mt-4 text-gray-600 text-sm">
        Showing {indexOfFirstMember + 1}-{Math.min(indexOfLastMember, teamMembers.length)} of {teamMembers.length} team members
      </p>
    </div>
  );
};

export default Team;