import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <RotatingLines
                visible={true}
                height="130"
                width="130"
                color="#CAEB66"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loading;