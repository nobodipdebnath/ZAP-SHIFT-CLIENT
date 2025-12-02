import React from 'react';
import support1 from '../../assets/live-tracking.png'
import support2 from '../../assets/safe-delivery.png'

const Support = () => {
    const supports = [
        {
            id: 1,
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image: support1
        },
        {
            id: 2,
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: support2
        },
        {
            id: 3,
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: support2
        },
    ]
    return (
        <div className='py-20 border-t-2 border-b-2 border-green-blue border-dashed'>
            <div className='flex flex-col gap-6'>
                {
                    supports.map(support => {
                        return(
                            <div className='p-8 rounded-3xl bg-white flex items-center gap-12' key={support.id}>
                                <div className='pr-12 border-r-2 border-dashed border-green-blue'>
                                    <img src={support.image} alt="" />
                                </div>
                                <div>
                                    <h1 className='text-2xl font-extrabold text-green-blue'>{support.title}</h1>
                                    <p className='text-black-base font-medium text-base mt-4'>{support.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Support;