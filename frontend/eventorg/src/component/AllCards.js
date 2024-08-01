import React from 'react';
import Cards from './Cards';
import Contactus from './Contactus';
import {Navigate, useNavigate }from 'react-router-dom'
const AllCards = () => {
    
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Cards
        image="./images/virtum2.jpg"
        title="Rabinarayan Sahu"
        description="Full stack web Developer"
       
      />
      <Cards
        image="./images/poolparty.jpg"
        title="Rabinarayan sahu"
        description="Full stack web developer"
       
      />
         <Cards
        image="./images/poolparty.jpg"
        title="Rabinarayan sahu"
        description="Full stack web developer"
       
      />
  <Cards
        image="./images/poolparty.jpg"
        title="Rabinarayan sahu"
        description="Full stack web developer"
       
      />
    </div>
  );
};

export default AllCards;
