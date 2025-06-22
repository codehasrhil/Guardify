import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {

  const [OpenMenu, SetOpenMenu] = useState(false);

  return (
    <div>
      <div className='fixed p-4  border-b-2 border-b-[#27363a] z-50 bg-[#141414] w-full text-white'>
        <div className='flex items-center justify-between'>

          {/* Logo */}
          <div className='text-3xl font-bold'>
            <h1>Guardify</h1>
          </div>

          {/* Navabar , btn */}
          <div className='flex items-center gap-6 max-lg:hidden'>
            <nav className='flex gap-5 text-lg font-semibold'>
              <Link to='/'>Home</Link>
              <Link to='/scan'>Scan</Link>
              <Link to="/about">About</Link>
            </nav>

            {/* Button */}
            <div className='text-lg bg-blue-500 p-2 px-4 text-black rounded-xl font-semibold'>
              <button>Start Scanning</button>
            </div>
          </div>

          {/* Menu  */}
          <div className='lg:hidden' onClick={() => SetOpenMenu(!OpenMenu)}>
            {OpenMenu ? <RxCross2 size={32} /> : <MdMenu size={32} />}
          </div>
        </div>
      </div>

        {/* Mobile Menu */}


       
          <div className={`h-[100vh] fixed top-0 right-0 w-full bg-[#141414] text-white z-40 grid items-center  justify-center transform transition-transform duration-500  ease-in-out
             ${OpenMenu ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div>
              <nav className='grid items-center justify-center text-2xl gap-10 font-bold'>
                <Link to='/'      onClick={() => SetOpenMenu(false)}>Home</Link>
                <Link to='/Scan'  onClick={() => SetOpenMenu(false)}>Scan</Link>
                <Link to='/About' onClick={() => SetOpenMenu(false)}>About</Link>
              </nav>
            </div>
            <div className='bg-blue-700 p-2 px-6 text-xl font-semibold rounded-xl'>
              <button>Start Scanning</button>
            </div>
          </div>
     


      
    </div>
  )
}

export default Navbar
