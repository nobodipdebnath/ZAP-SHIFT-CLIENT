import React from 'react';
import merchantImage from '../../assets/location-merchant.png'
import banner from '../../assets/be-a-merchant-bg.png'

const Merchant = () => {
    return (
        <div style={{backgroundImage: `url(${banner})`, backgroundRepeat: 'no-repeat'}} className='p-20 bg-green-blue rounded-4xl mt-20 mb-25'>
            <div className='grid grid-cols-2 items-center '>
                <div>
                    <h1 className='text-[40px] font-extrabold text-white'>Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className='mt-4 text-base font-medium text-black-base'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className='mt-12 flex items-center gap-6'>
                        <button className='py-4 px-8 border hover:bg-[#CAEB66] duration-500 hover:text-green-blue cursor-pointer border-[#CAEB66] rounded-full text-xl font-semibold text-white '>Become a Merchant</button>
                        <button className='py-4 px-8 border hover:bg-[#CAEB66] duration-500 hover:text-green-blue cursor-pointer border-[#CAEB66] rounded-full text-xl font-semibold text-white '>Earn with Profast Courier</button>
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