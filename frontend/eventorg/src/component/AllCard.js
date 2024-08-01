import React from 'react';
import Card from './Card';
import Contactus from './Contactus';
import {Navigate, useNavigate }from 'react-router-dom'
const AllCard = () => {
    
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Card
        image="./images/virtum2.jpg"
        title="Virtual Event"
        description="We provide A virtual event, also known as an online event, virtual conference or livestream, is an event that involves people interacting in an online environment."
       
      />
      <Card
        image="./images/poolparty.jpg"
        title="Pool party  "
        description="Pool Party Venues in Bhubaneswar: Splash! Splash! Pool parties are always exciting. Make it more exciting with funny clothing theme, decorative balloons, skinny cocktails, etc."
       
      />
         <Card
        image="./images/birthday.jpg"
        title=" Birthday party"
        description="A Birthday is a momentous occasion in the life of a child that deserves to be celebrated with a lot of zeal and enthusiasm."
        
      />
      <Card
        image="./images/corporate3.jpeg"
        title="Corporate party"
        description="Corporate Party means any one, two or all of Citizens, Investors or Central. Corporate Party means a Party who is not a Research Party."
        
      />
    </div>
  );
};

export default AllCard;
