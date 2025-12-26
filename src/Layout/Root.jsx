import React, { useState, useEffect } from 'react';
import NavBar from '../components/Shared/NavBar';
import Footer from '../components/Shared/Footer';
import { Outlet } from 'react-router';

const Root = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll down → hide navbar
        setShowNav(false);
      } else {
        // Scroll up → show navbar
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className='py-10 lg:mt-0 lg:mb-0 mt-0 mb-0 m-4 lg:m-10'>
      {/* Navbar with fixed + slide effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          transition: 'transform 0.3s ease',
          transform: showNav ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <NavBar />
      </div>

      {/* Add top padding equal to navbar height to prevent content overlap */}
      <div style={{ paddingTop: '60px' }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
