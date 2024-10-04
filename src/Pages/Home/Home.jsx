import React from 'react';
import Banner from '../Banner/Banner';
import CardContainer from '../CardContainer/CardContainer';
import Faq from '../Faq/Faq';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Blood Bridge | Home</title>
            </Helmet>

            <h2 className=''>Home</h2>

            {/* ------Banner------ */}
            <div className='mt-16'>
                {/* <h3 className='mt-10'>Second Heading</h3> */}
                <Banner></Banner>
            </div>
            <CardContainer></CardContainer>
            <Faq></Faq>
        </div>
    );
};

export default Home;