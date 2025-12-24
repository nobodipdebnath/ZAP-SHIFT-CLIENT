import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";

const Blogs = () => {
  const blogs = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  return (
    <div className=" px-3  md:px-16 my-8 md:my-12 bg-white rounded-3xl py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-blue">
          Our Blogs
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Read useful articles about parcel delivery, tracking, safety, and our delivery process.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl border border-input-text p-3 md:p-6 hover:shadow-lg transition"
          >
            <img className="w-full h-[250px] rounded-lg mb-4 object-cover" src={blog.image} alt="" />
            <p className="text-sm text-gray-500">{blog.date}</p>
            <h2 className="text-xl font-bold mt-2 text-gray-800">
              {blog.title}
            </h2>
            <p className="mt-3 text-gray-600 text-sm">
              {blog.description}
            </p>

            <Link to={`/blog/${blog.id}`}>
              <button className="mt-5 cursor-pointer text-green-600 font-semibold hover:underline">
                Read More →
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`px-3 py-2 rounded-lg border border-input-text ${
            currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded-lg border border-input-text cursor-pointer ${
              currentPage === i + 1
                ? "bg-[#c0dd67] text-green-blue"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`px-3 py-2 rounded-lg border border-input-text text-input-label ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;
