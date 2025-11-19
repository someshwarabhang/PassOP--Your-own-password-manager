import React from 'react'
import heart from "../assets/icons/heart.png";

const Footer = () => {
  return (
    <div className="bg-teal-200 text-black flex flex-col justify-center items-center  w-full">

  <div className="logo font-extrabold text-2xl tracking-wide flex items-center">
    <span className="text-teal-900">&lt;</span>
    Pass<span className="text-teal-900">OP/&gt;</span>
  </div>


  <div className="flex items-center text-sm">
    Created with 
    <img 
      src={heart}
      alt="heart"
      className="w-5 h-5 mx-1 inline-block" 
    />
    by our group
  </div>
</div>

  )
}

export default Footer
