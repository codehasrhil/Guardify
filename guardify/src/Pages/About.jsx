import React from 'react'
import unname from './../assets/unnamed.png'
import { Link } from 'react-router-dom'
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const About = () => {
  return (
    <div className='bg-[#141414] w-full mx-auto sm:w-[620px] md:w-[740px] lg:w-[940px] xl:w-[1024px]'>
      <div className='pt-24 text-white'>

        <div className='grid lg:grid-cols-2'>

        {/* Img */}

          <div className='min-h-[360px] flex justify-center lg:justify-start lg:px-8 w-full'>
            <img src={unname} alt="Img" className=' border-2 border-gray-800 rounded-4xl h-[380px]' />
          </div>

        {/* IMg text   */}

          <div>
            <div className='p-6 mt-4 grid gap-4 lg:gap-8 lg:p-4'>
              <div className='text-3xl font-bold lg:text-4xl'>
                <h1>About Out Guardiy Platform</h1>
              </div>
              <div className='text-lg text-gray-600 font-semibold lg:text-xl'>
                <p>Our platform offers advanced virus scanning for links and PDFs using a cutting-edge API. We ensure your digital safety with fast, reliable, and secure scans.</p>
              </div>
              <div className='bg-black py-2 px-8 w-fit text-lg rounded-xl'>
                <Link to='/'>Go To Home</Link>
              </div>
            </div>
          </div>

        </div>

        <div>
          <div>

          {/* Text */}

            <div className='p-6 grid gap-4'>
              <div className='text-3xl font-bold'>
                <h1>Our Platform's Capabilities</h1>
              </div>
              <div className='text-gray-600 text-lg font-semibold'>
                <p>Explore the features that make our virus scanning platform a reliable choice for your security needs.</p>
              </div>
            </div>

          {/* Table */}

            <div className='text-white mt-10 px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3  pb-12'>
              <div className='border-2 border-[#202E32] p-4 bg-[#1c2629] rounded-2xl flex gap-[4px] flex-col'>
                <p><IoShieldCheckmarkOutline /></p>
                <p>Fast Scanning</p>
                <p className='text-[#62767c]'>Quickly scan links and PDFs with our advanced API.</p>
              </div>
              <div className='border-2 border-[#202E32] p-4 bg-[#1c2629] rounded-2xl flex gap-[4px] flex-col'>
                <p><FaRegFile /></p>
                <p>Enhanced Security</p>
                <p className='text-[#62767c]'>Robust security measures to protect your data during scans.</p>
              </div>
              <div className='border-2 border-[#202E32] p-4 bg-[#1c2629] rounded-2xl flex gap-[4px] flex-col'>
                <p><MdLockOutline /></p>
                <p>User Privacy</p>
                <p className='text-[#62767c]'>We prioritize your privacy and ensure your data remains confidential.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default About
