import React from 'react'
 import style from './Evecr.module.css'
 import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
const Evecr = () => {
  useGSAP(()=>{
    gsap.from('span',{
       x:200,
       opacity:0,
       duration:2,
       stagger:0.1
       
    
    })
    })
    
  return (<>
    <div className={style.cont}>
      <h1 className={style.load}><span className={style.spn}>E</span><span className={style.spn}>v</span><span className={style.spn}>e</span><span className={style.spn}>n</span><span className={style.spn}>t</span>  <span className={style.spn}>t</span><span className={style.spn}>a</span><span className={style.spn}>n</span><span className={style.spn}>t</span><span className={style.spn}>r</span><span className={style.spn}>a</span></h1>
    </div>
    </>
  )
}

export default Evecr
