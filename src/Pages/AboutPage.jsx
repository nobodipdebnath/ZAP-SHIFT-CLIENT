import React from 'react';
import { NavLink } from 'react-router';

const AboutPage = () => {
  return (
    <div>
      <h1 className='text-[56px] font-extrabold text-green-blue'>About Us</h1>
      <p className='text-base text-black-base max-w-3xl'>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle...
      </p>

      <hr className='my-12 text-gray-400'/>

      <ul className='flex flex-col md:flex-row gap-3 md:gap-12 font-semibold text-lg text-black-base'>
        <li>
          <NavLink 
            to="."
            className={({ isActive }) =>
              isActive ? "text-green-blue underline" : ""
            }
          >
            Story
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/about/mission"
            className={({ isActive }) =>
              isActive ? "text-green-blue underline" : ""
            }
          >
            Mission
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/about/success"
            className={({ isActive }) =>
              isActive ? "text-green-blue underline" : ""
            }
          >
            Success
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/about/team"
            className={({ isActive }) =>
              isActive ? "text-green-blue underline" : ""
            }
          >
            Team & Others
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
