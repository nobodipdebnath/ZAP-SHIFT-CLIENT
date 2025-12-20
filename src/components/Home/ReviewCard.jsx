import React from 'react';
import comma from '../../assets/doublelono.png'

const ReviewCard = ({singleReview}) => {
    const{userName, review, user_photoURL, date} = singleReview;
    return (
        <div className='lg:p-8 p-4 bg-white rounded-3xl ml-6'>
            <img src={comma} alt="" />
            <p className='text-base text-black-base mb-6'>{review}</p>
            <div className='flex pt-8 border-t-2 border-dashed border-green-blue items-center gap-2'>
                <img className='h-14 w-14 object-cover rounded-full' src={user_photoURL} alt="" />
                <div className=''>
                    <h4 className='text-xl font-bold text-green-blue'>{userName}</h4>
                    <p className='text-base text-black-base font-medium'>{date}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;