import React, { useState,useEffect,useRef, } from 'react'
import Navbar from './Navbar'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import sample from './backgv1.mp4'
import AllCard from './AllCard'
import {Link} from 'react-router-dom'
import styles from './Footer.module.css'
const Home = () => {
 
useGSAP(()=>{
  gsap.to('.right',{
    height:'250px',
    width:'500px',


   marginTop:'250px',
   marginLeft:'180px',
   marginRight:'90px',
   borderRadius:'10px',
   boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
   
    
  })
})

useGSAP(()=>{
  gsap.to('.right2',{
    height:'300px',
    width:'400px',
borderRadius:'20px',
   marginTop:'180px',
   marginLeft:'100px',
   marginRight:'90px',
   
   boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
   
    
  })
})
useGSAP(()=>{
  gsap.to('.parent',{
     height:'100vh',
     width:'100%',
  background:'linear-gradient(146deg, rgba(222,230,230,0.8772759103641457) 38%, rgba(95,199,230,0.5803571428571428) 46%)',
  display:'flex',
  fontFamily: "Ubuntu",
  // font-weight: 400;
  fontStyle: 'italic',
    // background:'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
    // background: 'rgb(222,230,230);
// background: 'linear-gradient(146deg, rgba(222,230,230,0.8772759103641457) 51%, rgba(0,36,34,0.13778011204481788) 100%)'
  })
  })
  useGSAP(()=>{
    gsap.to('.left',{
       height:'300px',
       width:'500px',
       marginTop:'250px',
       marginLeft:'130px',
       
    
    })
    })
    useGSAP(()=>{
      gsap.to('.left2',{
         height:'300px',
         width:'500px',
         marginTop:'130px',
         marginLeft:'900px',
         
      
      })
      })
    useGSAP(()=>{
      gsap.to('.h12',{
         fontSize:'2.5rem'
      
      })
      })
      useGSAP(()=>{
        gsap.to('.con',{
           display:'flex',
        
        })
        })
        useGSAP(()=>{
          gsap.to('.txt',{
            height:'300px',
            width:'500px',
            marginTop:'250px',
            marginLeft:'150px',
          
          })
          })

      useGSAP(()=>{
        gsap.to('.page2',{
           height:'100vh',
           width:'100%',
          //  marginTop:'80px'
          background:'linear-gradient(146deg, rgba(124,209,235,1) 24%, rgba(222,230,230,1) 52%)',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
// backgroundImage:"url('./images/cracker.avif')",
        })
        })
        useGSAP(()=>{
          gsap.to('.page3',{
             height:'188vh',
             width:'100%',
            // marginTop:'-250px',
            background:'linear-gradient(146deg, rgba(222,230,230,1) 27%, rgba(124,209,235,1) 82%)',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  // backgroundImage:"url('./images/cracker.avif')",
           
          })
          })
  


  return (<>
<Navbar/>
<div className='parent'>
  <div className='left'>
    <h1 className='h12'>Create your Event life time memorable</h1>
<p>We serve you the best experience in the market as compare to others Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium blanditiis accusamus labore. Ipsa eum, consectetur sed quam nesciunt enim ipsam obcaecati neque. Est nisi dolor illo facere harum saepe magnam!</p>
<Link to='/contact'><button > Contact</button></Link>
  </div>
      <div >
        <img className='right' src="./images/event4.jpg" alt="" />
      
      </div>
      
    </div>
    <div className='page2' ><AllCard/></div>
    <div className='page3' ><div className='con'><img className='right2' src="./images/party.jpg" alt="" /><div className='txt'><h1>Lets join the event around you</h1>
    <p>lets make the life enjoy with us grab a ticet lets party togather in your area Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto magni voluptatem at eveniet ea vero delectus! Voluptas aperiam enim atque? Laudantium nisi atque rem a ad minus, sed impedit enim.</p><Link to='/login'><button > Join now</button></Link></div></div>
    <div className='left2'></div>
    <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
                <div className={styles.links}>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact Us</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>
            </div>
        </footer>
    </div>
 
     
    </>
  )   }


export default Home;
 