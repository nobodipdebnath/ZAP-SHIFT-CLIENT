import React, { useEffect, useState } from 'react';
import customer from '../../assets/customer-top.png'
import axios from 'axios';
import ReviewCard from './ReviewCard';
import Marquee from 'react-fast-marquee';

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get('./reviews.json')
        .then(res => setReviews(res.data))
    }, [])
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <img src={customer} alt="" />
                <h1 className='lg:text-[40px] text-4xl mt-5 font-extrabold text-green-blue text-center md:text-start '>What our customers are sayings</h1>
                <p className='text-black-base mt-2 text-base text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
            </div>
            <Marquee pauseOnHover>
                <div className='flex  mt-10'>
                    {
                        reviews.map(singleReview => <ReviewCard key={singleReview.id} singleReview={singleReview} ></ReviewCard>)
                    }
                </div>
            </Marquee>
            
        </div>
    );
};

export default Testimonial;