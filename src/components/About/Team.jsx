import React from "react";

// Example team data
const teamMembers = [
  {
    id: 1,
    name: "Nobodip Debnath",
    role: "CEO & Founder",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 2,
    name: "Raisa Ahmed",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    role: "Delivery Manager",
    image: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: 4,
    name: "Sadia Khatun",
    role: "Customer Support Lead",
    image: "https://i.pravatar.cc/300?img=4",
  },
  {
    id: 5,
    name: "Riders Team",
    role: "Delivery Team",
    image: "https://i.pravatar.cc/300?img=5",
  },
];

const Team = () => {
  return (
    <div className="px-6 md:px-16 my-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700">Meet Our Team</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Our professional team ensures safe, fast, and reliable parcel delivery for all customers.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
