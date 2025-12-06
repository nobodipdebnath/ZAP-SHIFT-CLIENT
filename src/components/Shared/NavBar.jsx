import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';
import { FiArrowUpRight } from "react-icons/fi";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const NavBar = () => {
    const {user, logOutUser} = useAuth();
    const links = <>
        <li className='px-5 py-3 rounded-full duration-500'><NavLink to='/'>Home</NavLink></li>
        <li className='px-5 py-3 rounded-full duration-500'><NavLink to='/sendParcel'>Send Parcel</NavLink></li>
        <li className='px-5 py-3 rounded-full duration-500'><NavLink to='/coverage'>Coverage</NavLink></li>
        <li className='px-5 py-3 rounded-full duration-500'><NavLink to='/about'>About Us</NavLink></li>
        <li className='px-5 py-3 rounded-full duration-500'><NavLink to='/pricing'>Pricing</NavLink></li>
        <li className='px-5 py-3 rounded-full duration-500'><NavLink to='/beARider'>Be a Rider</NavLink></li>
        {
            user && <>
                <li className='px-5 py-3 rounded-full duration-500'><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </>
        }
    </>
    
    const logOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Sign Out Your Account",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Sign Out!",
                    text: "Your account has been sign Out.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                logOutUser();
            }
        });
    }
    return (
        <nav className='flex items-center justify-between py-5 px-8 bg-white rounded-lg'>
            <div>
                <Link><img src={logo} alt="" /></Link>
            </div>
            <ul className='flex text-base font-medium text-base-gray items-center'>
                {links}
            </ul>
            {
                user 
                ? 
                <div className='flex items-center gap-4'>
                    <Link>
                        <button onClick={logOut} className='text-lg font-bold text-base-gray px-8 py-3 rounded-xl border-[#DADADA] hover:bg-[#CAEB66] duration-500 hover:text-black border'>Log Out</button>
                    </Link>
                </div> 
                : 
                <div className='flex items-center gap-4'>
                    <Link to='/login'>
                        <button className='text-lg font-bold text-base-gray px-8 py-3 rounded-xl border-[#DADADA] hover:bg-[#CAEB66] duration-500 hover:text-black border'>LogIn</button>
                    </Link>
                    <Link to='/register'>
                        <button className='text-lg font-bold text-base-gray px-8 py-3 rounded-xl border-[#DADADA] hover:bg-[#CAEB66] duration-500 hover:text-black border'>Register</button>
                    </Link>
                    <button className='p-3 bg-dark-blue rounded-full'><FiArrowUpRight className='text-[#CAEB66] text-2xl '></FiArrowUpRight></button>
                </div>
            }
            
        </nav>
    );
};

export default NavBar;