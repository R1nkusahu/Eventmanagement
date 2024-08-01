import React from 'react'
import {Link} from 'react-router-dom'
import style from './Navbar.module.css'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
const Navbar = () => {
  useGSAP(()=>{
    gsap.to(".navList",{
      opacity:0,
      duration:1,
      y:30,
      delay:1
    })
  })
  return (
    <>
      <nav className={style.navbar}>
        <div><h1 className={style.h1}>Event Tantra:</h1></div>
        <ul className={style.navList}>
        <li className={style.navItem}><Link className={style.navLink } to='/' >Home</Link></li>
        <li className={style.navItem}><Link className={style.navLink } to='/eventsee' >Events</Link></li>
        <li className={style.navItem}><Link className={style.navLink } to='/contact' >Contact</Link></li>
       
        <li className={style.navItem}><Link  className={style.navLink } to='/signup' >Signup</Link></li>
        <li className={style.navItem}><Link  className={style.navLink } to='/login' >Login</Link></li>
        
        </ul>
      </nav>
    </>
  )
}

export default Navbar;
