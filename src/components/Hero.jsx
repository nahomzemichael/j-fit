import React from 'react'

const Hero = () => {
  return (
    
      <div className = " px-10 justify-center items-center relative flex h-[80vh] w-full overflow-hidden ">
        <img className=" h-full w-full opacity-50  rounded-md" src=".././public/hero-2.jpg" alt="hero"/>
      
      
        <p className = "text-center text-7xl md:text-xxl font-bold text-gray-700 absolute z-3">
          <i>J-FIT </i><br />
          <span className ="text-4xl font-bold text-purple-900" >take control of your health journey.</span> 
        </p>
          
        
      </div>
   
  )
}

export default Hero
