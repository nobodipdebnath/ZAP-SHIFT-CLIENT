import React from 'react';
import Banner from '../components/Home/Banner';
import Work from '../components/Home/Work';
import Services from '../components/Home/Services';
import Teams from '../components/Home/Teams';
import Support from '../components/Home/Support';
import Merchant from '../components/Home/Merchant';
import Testimonial from '../components/Home/Testimonial';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Work></Work>
            <Services></Services>
            <Teams></Teams>
            <Support></Support>
            <Merchant></Merchant>
            <Testimonial></Testimonial>
        </div>
    );
};

export default HomePage;