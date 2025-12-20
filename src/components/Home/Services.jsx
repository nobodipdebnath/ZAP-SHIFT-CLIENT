import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('./services.json')
        .then(res => setServices(res.data));
    }, [])

    return (
        <div className='lg:py-25 py-8 my-14 lg:my-25 px-5 lg:px-28 bg-[#03373D] rounded-4xl'>
            <h1 className='text-center text-white font-extrabold text-[40px]'>Our Services</h1>
            <p className='text-center text-base font-medium mt-4 text-dep-dark'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            <div className='grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map((service, idx) => <ServiceCard key={idx} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;