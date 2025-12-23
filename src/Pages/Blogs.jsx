import React from "react";

const blogs = [
  {
    id: 1,
    title: "How Our Parcel Delivery System Works",
    description:
      "Learn how we collect, track, and deliver parcels safely and on time using our smart delivery system.",
    date: "12 August 2025",
  },
  {
    id: 2,
    title: "Why Parcel Tracking is Important",
    description:
      "Real-time parcel tracking helps customers stay updated and builds trust in delivery services.",
    date: "18 August 2025",
  },
  {
    id: 3,
    title: "Safe Parcel Handling Tips",
    description:
      "We ensure parcel safety with proper packaging, careful handling, and trained delivery riders.",
    date: "25 August 2025",
  },
  {
    id: 4,
    title: "Cash on Delivery: A Reliable Option",
    description:
      "Cash on delivery allows customers to pay only after receiving their parcels safely.",
    date: "1 September 2025",
  },
  {
    id: 5,
    title: "How Our Riders Ensure Fast Delivery",
    description:
      "Our professional riders use optimized routes and real-time updates to ensure fast delivery.",
    date: "8 September 2025",
  },
];

const Blogs = () => {
  return (
    <div className="px-6 md:px-16 my-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700">
          Our Blogs
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Read useful articles about parcel delivery, tracking, safety, and our
          delivery process.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500">{blog.date}</p>
            <h2 className="text-xl font-bold mt-2 text-gray-800">
              {blog.title}
            </h2>
            <p className="mt-3 text-gray-600 text-sm">
              {blog.description}
            </p>

            <button className="mt-5 text-green-600 font-semibold hover:underline">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
