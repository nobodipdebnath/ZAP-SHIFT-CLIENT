import React from 'react';
import customer from '../../assets/customer-top.png'

const Testimonial = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <img src={customer} alt="" />
                <h1 className='text-[40px] mt-5 font-extrabold text-green-blue '>What our customers are sayings</h1>
                <p className='text-black-base mt-2 text-base text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
            </div>
        </div>
    );
};

export default Testimonial;