import React from 'react'
import { Link } from 'react-router-dom'
import Ok from '../assets/ok.png'
import { FaLink } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const Home = () => {
  return (
    <div className='bg-[#141414] w-full mx-auto sm:w-[620px] md:w-[740px] lg:w-[940px] xl:w-[1024px]'>
      <div className='p-4 pt-24 w-full sm:p-6 sm:pt-24 '>
        <div
          className="flex min-h-[280px] flex-col gap-6 sm:gap-8 border-2 border-[#161718]  bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center  text-center  md:min-h-[320px] lg:min-h-[400px] xl:min-h-[460px]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${Ok})`
          }}
        >
          <div className='flex flex-col gap-4 items-center'>
            <h1 className="text-white text-4xl sm:text-5xl  font-black leading-tight tracking-tight">
              Guardify
            </h1>
            <h2 className='text-white text-lg px-4'>Advanced security solutions for your digital world.</h2>
            <Link to='/scan' className='bg-[#0CF2A5] py-2 px-6 mb-14 rounded-2xl text-lg font-bold'>Scan</Link>
          </div>

        </div>
        <div>
          <div className=' text-white mt-5 grid gap-2'>
            <h1 className='text-2xl font-bold  md:text-3xl lg:text-4xl '>Comprenesive Protection</h1>
            <p className='text-[#62767c]'>Our advanced scanning technology ensures your digital life remains secure.</p>
          </div>
        </div>
        <div>
          <div className='text-white mt-10 px-2 grid gap-8 md:grid-cols-2 lg:grid-cols-3 sm:px-0 '>
            <div className='border-2 border-[#202E32] p-4 bg-[#1c2629] rounded-2xl flex gap-[4px] flex-col'>
              <p><FaLink /></p>
              <p>Link Scanning</p>
              <p className='text-[#62767c]'>Analyze URLs for malicious content before you click.</p>
            </div>
            <div className='border-2 border-[#202E32] flex gap-[4px] flex-col p-4 bg-[#1c2629] rounded-2xl'>
              <p><FaRegFile /></p>
              <p>File Scanning</p>
              <p className='text-[#62767c]'>Check files for viruses and malware before downloading.</p>
            </div>
            <div className='border-2 p-4 bg-[#1c2629] rounded-2xl border-[#202E32] flex gap-[4px] flex-col'>
              <p><IoMdTime /></p>
              <p>Real-Time Results</p>
              <p className='text-[#62767c]'>Get instant feedback on the safety of your digital interactions.</p>
            </div>
          </div>
        </div>
        <div>
          <div className='text-white flex justify-center flex-col items-center mt-12 px-6 gap-4'>
            <h1 className='text-2xl font-bold'>Ready To secure Your Digital World?</h1>
            <p className='text-gray-500 font-semibold sm:px-6'>Begin scanning now to protect your devices and data from online threats.</p>
            <div className='text-lg bg-white  w-fit p-2 px-4  justify-center mt-2 text-black rounded-2xl font-semibold'>
              <Link to='/scan' onClick={() => SetOpenMenu(false)}>Start Scanning</Link>
            </div>          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
