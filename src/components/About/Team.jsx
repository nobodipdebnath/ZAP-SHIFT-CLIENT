import React, { useState } from "react";

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
    name: "Nahid Islam",
    role: "Finance Manager",
    image: "https://i.ibb.co.com/wZT4k1Cf/513877341-1220725593028308-1290451784703447551-n.jpg",
  },
  {
    id: 10,
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="md:px-16 my-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-green-blue">
          Meet Our Team
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Our professional team ensures safe, fast, and reliable parcel delivery
          for all customers.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {currentMembers.map((member) => (
          <div
            key={member.id}
            className="py-8 p-4 lg:px-10 bg-white shadow rounded-2xl"
          >
            <img
              src={member.image}
              alt={member.name}
              className="rounded-full h-[200px] w-[200px] md:h-[250px] md:w-[250px] mx-auto border-6 border-green-500 object-cover"
            />
            <div className="flex items-center justify-center flex-col mt-4">
              <h2 className="text-2xl font-extrabold text-green-blue">
                {member.name}
              </h2>
              <p className="text-base font-medium text-gray-800">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-3">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => paginate(idx + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === idx + 1
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border-green-700"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Team;
