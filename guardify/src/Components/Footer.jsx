import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <div className='bg-[#141414] h'>
       <div>
          <div className='w-full h-[1px] bg-gray-400'></div>
          <div className='grid gap- mt-4 text-gray-400 justify-center'>
             <div className='flex gap-2 justify-center'>
                <p><FaInstagram size={28} /></p>
                <p><CiYoutube size={32}/></p>
             </div>
             <div className='flex gap-1 pb-4'>
                <p>&copy;2025</p>
                <p>Guardify</p>
                <p>.All Rights reserved.</p>
             </div>
          </div>
       </div>
    </div>
  )
}

export default Footer
