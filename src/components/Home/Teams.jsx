import React from 'react';
import Marquee from "react-fast-marquee";
import brand1 from '../../assets/brands/amazon.png'
import brand2 from '../../assets/brands/amazon_vector.png'
import brand3 from '../../assets/brands/casio.png'
import brand4 from '../../assets/brands/moonstar.png'
import brand5 from '../../assets/brands/randstad.png'
import brand6 from '../../assets/brands/start-people 1.png'
import brand7 from '../../assets/brands/start.png'

const Teams = () => {
    return (
        <div className='mb-25'>
            <h1 className='text-center text-[40px] font-extrabold text-green-blue' >We've helped thousands of sales teams</h1>
            <Marquee >
                <div className='mt-8 flex items-center gap-25'>
                    <img src={brand1} alt="" />
                    <img src={brand2} alt="" />
                    <img src={brand3} alt="" />
                    <img src={brand4} alt="" />
                    <img src={brand5} alt="" />
                    <img src={brand6} alt="" />
                    <img src={brand7} alt="" />
                </div>
            </Marquee>
        </div>
    );
};

export default Teams;