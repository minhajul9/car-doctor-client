import React from 'react';
import Banner from '../Banner/Banner';
import AboutSection from '../AboutSection/AboutSection';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <Services></Services>
        </div>
    );
};

export default Home;