import React from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';

const SingleBlog = () => {
    const { id } = useParams();
    const blogs = useLoaderData();
    const navigate = useNavigate();

    const blog = blogs.find(b => String(b.id) === String(id));

    console.log(blog);

    return (
        <div className="bg-white rounded-3xl p-16 my-8 grid grid-cols-1 lg:grid-cols-2 gap-7 py-10">
            <div>
                <img src={blog?.image} className="" alt={blog?.title} />
            </div>
            <div>
                <p className="text-gray-500 text-sm">{blog?.date}</p>
                <h1 className="text-3xl font-bold mt-2">{blog?.title}</h1>
                <p className="mt-5 leading-7 text-gray-700">{blog?.content}</p>
                <div>
                    <button onClick={() => navigate(-1)} className='py-3 px-10 border border-input-text text-green-blue font-medium text-lg cursor-pointer mt-8 rounded-full hover:bg-[#c0dd67] duration-500'>Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
