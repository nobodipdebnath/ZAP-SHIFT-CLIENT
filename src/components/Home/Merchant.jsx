import React from 'react';
import merchantImage from '../../assets/location-merchant.png'
import banner from '../../assets/be-a-merchant-bg.png'
import { Link } from 'react-router';

const Merchant = () => {
    return (
        <div style={{backgroundImage: `url(${banner})`, backgroundRepeat: 'no-repeat'}} className='lg:p-20 bg-green-blue rounded-4xl p-4 mt-20 mb-25'>
            <div className='grid lg:gap-0 gap-5 lg:grid-cols-2 items-center py-8 '>
                <div>
                    <h1 className='lg:text-[40px] text-center md:text-start text-4xl font-extrabold text-white'>Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className='mt-4 text-base font-medium text-black-base'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className='mt-12 flex-col md:flex-row flex items-center gap-6'>
                        <button className='py-4 px-8 border hover:bg-[#CAEB66] duration-500 hover:text-green-blue cursor-pointer border-[#CAEB66] rounded-full lg:text-xl font-semibold text-white '>Become a Merchant</button>
                        <Link to='/beARider'>
                            <button className='py-4 px-8 border hover:bg-[#CAEB66] duration-500 hover:text-green-blue cursor-pointer border-[#CAEB66] rounded-full lg:text-xl font-semibold text-white '>Earn with Profast Courier</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={merchantImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Merchant;