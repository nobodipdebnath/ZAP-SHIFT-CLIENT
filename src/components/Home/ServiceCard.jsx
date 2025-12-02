import React from 'react';
import serviceImage from '../../assets/service.png'

const ServiceCard = ({service}) => {
    const {title, description} = service;
    return (
        <div className='py-8 px-6 flex items-center justify-center flex-col duration-500 transition-all hover:bg-[#CAEB66] bg-white rounded-3xl'>
            <img className='services p-3 rounded-full' src={serviceImage} alt="" />
            <h2 className='text-center text-2xl font-bold text-green-blue my-4'>{title}</h2>
            <p className='text-base text-black-base font-medium text-center'>{description}</p>
        </div>
    );
};

export default ServiceCard;