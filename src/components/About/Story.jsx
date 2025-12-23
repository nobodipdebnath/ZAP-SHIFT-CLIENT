import React from "react";

const storySections = [
  {
    id: 1,
    title: "Our Beginning",
    description:
      "Parcel Delivery App was founded with a vision to provide fast, reliable, and secure parcel delivery for individuals and businesses across the country.",
  },
  {
    id: 2,
    title: "Our Mission",
    description:
      "We are committed to delivering parcels safely and on time while ensuring customer satisfaction and real-time tracking.",
  },
  {
    id: 3,
    title: "Our Values",
    description:
      "Integrity, reliability, professionalism, and innovation guide everything we do.",
  },
  {
    id: 4,
    title: "Achievements",
    description:
      "Delivered 50,000+ parcels, maintained 99% on-time delivery rate, and earned the trust of thousands of happy customers.",
  },
];

const Story = () => {
  return (
    <div className="px-6 md:px-16 my-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700">
          Our Story
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Learn about how we started, our mission, values, and achievements.
        </p>
      </div>

      {/* Story Sections */}
      <div className="flex flex-col gap-8">
        {storySections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-600 text-sm">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Story;
