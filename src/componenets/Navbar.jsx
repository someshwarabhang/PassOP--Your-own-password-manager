import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-teal-200  '>
      <div className="mycontainer flex justify-between items-center px-5 py-5 h-12">
        <div className='logo font-bold text-2xl'>
          <span className='text-teal-900'>&lt;</span>
          Pass
          <span className='text-teal-900'>OP/&gt;</span>
        </div>
         <ul>
        {/*<li className=' flex gap-5 text-lg'>
          <a className =  "hover:font-bold" href="/">Home</a>
          <a className =  "hover:font-bold" href="#">Contact us </a>
          <a className =  "hover:font-bold" href="#">About Us</a>
        </li>*/}
      </ul> 
        <button className="bg-black text-white my-5 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition ring-white ring-2">
          <img
            className="w-6 h-6 invert"
            src="/icons/github.png"
            alt="GitHub logo"
          />
          <span className="font-semibold">GitHub</span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar
