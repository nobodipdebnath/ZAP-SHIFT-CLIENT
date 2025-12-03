import { useNavigate } from 'react-router';
import successAnimation from '../assets/error.png'

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-center py-20 px-18 bg-white rounded-4xl mt-10 mb-20'>
            <div className='flex justify-center items-center flex-col'>
                <img src={successAnimation} alt="" />
                <button onClick={()=>navigate('/')} className='py-3 px-10 bg-[#CAEB66] rounded-lg text-xl font-bold text-green-blue mt-5 cursor-pointer '>Go Home</button>
            </div>
        </div>
    );
};

export default ErrorPage;