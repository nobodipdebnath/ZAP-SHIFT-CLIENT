import React from 'react';

const Work = () => {
    const works = [
        {
            id: 1,
            title: 'Booking Pick & Drop',
            description: "From personal packages to business shipments — we deliver on time, every time.",
            image: "https://i.ibb.co.com/hFkVcFFt/fi-9618754.png"
        },
        {
            id: 2, 
            title: 'Cash On Delivery', 
            description: "From personal packages to business shipments — we deliver on time, every time.", 
            image: "https://i.ibb.co.com/hFkVcFFt/fi-9618754.png"
        },
        {
            id: 3, 
            title: 'Delivery Hub', 
            description: "From personal packages to business shipments — we deliver on time, every time.", 
            image: "https://i.ibb.co.com/hFkVcFFt/fi-9618754.png"
        },
        {
            id: 4, 
            title: 'Booking SME & Corporate', 
            description: "From personal packages to business shipments — we deliver on time, every time.", 
            image: "https://i.ibb.co.com/hFkVcFFt/fi-9618754.png"
        },
    ]
    return (
        <div>
            <h1 className='text-[32px] font-extrabold text-green-blue'>How it Works</h1>
            <div className='grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    works.map(work => {
                        return (
                            <div className='p-8 bg-white rounded-3xl' key={work.id}>
                                <img className='h-14 ' src={work.image} alt="" />
                                <h2 className='text-xl font-bold text-green-blue mt-6 mb-4'>{work.title}</h2>
                                <p className='text-base font-medium text-black-base'>{work.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Work;