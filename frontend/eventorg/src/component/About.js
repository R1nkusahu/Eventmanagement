import React, { useEffect } from 'react'
import axios from 'axios'
const About = () => {
useEffect(()=>{
  axios.get('http://localhost:3005/')
  .then(res=> console.log(res))
  .catch(err=>console.log(err));
},[])

  return (
    <div >
     <div>
      <button>add +</button>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
     </div>
    </div>
  )
}

export default About
