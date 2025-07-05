import React, { Suspense, useState } from 'react'
import DragDrop from '../Components/DragDrop'
import { ApiKey,BaseUrl } from '../Config/Scrip';
import axios from 'axios';
import ScanResult from './ScanResult';



const Scan = () => {

  const [url, setUrl] = useState("")
  const [scanId, setScanId] = useState('');
  const [scanResult, setscanResult] = useState(null);
  const [loading, setloding] = useState(false);

  const handleScanUrl = async () => {
    console.log("url is got")
    if (!url) {
      alert('please Enter the Url');
      return;
    }

    setloding(true);
    setscanResult(null);

    const data = new URLSearchParams();
    data.append("url", url);

    try {

      const response = await axios.post('/.netlify/functions/scanUrl', data);

      console.log("Scan successful.. Id", response.data);
      const id = response.data.id;
      setScanId(id);
      await getScanResult(id);

    } catch (error) {
      console.log("This is Error:", error);
    } finally {
      setloding(false);
    }
  };

  const getScanResult = async (scanId) => {
    try {
      const response = await axios.get(`${BaseUrl}/analyses/${scanId}`, {
        headers: {
          "x-apikey": ApiKey,
        }
      })
      setscanResult(response.data.data);
    } catch (error) {
      console.log("Scan is faild:", error);
    }
  }


  return (
    <div>
      <div className='bg-[#141414] w-full mx-auto sm:w-[620px] md:w-[740px] lg:w-[940px] xl:w-[1024px]'>
        <div className='pt-24 text-white'>

          {/* Url scan */}

          <div className='grid px-6  gap-6'>
            <div className='font-bold grid gap-4'>
              <h1 className='text-4xl'>Virus Scanner</h1>
              <p className='text-xl'>URL Scan</p>
            </div>
            <div>
              <input type="text" placeholder='Enter URL   (e.g., https://example.com)' value={url} onChange={(e) => setUrl(e.target.value)} className='border-none outline-none text-lg w-full  px-6 sm:w-[350px]  rounded-lg  p-2 bg-[#303030]' />
            </div>
            <div>
              <button className='bg-[#303030] p-2 px-6  rounded-xl' onClick={handleScanUrl}>{loading ? 'Scanning...' : 'Scan URL'}</button>
            </div>
          </div>

          {/* Result Section */}

          {loading && (
            <div className='text-center text-gray-300 mt-6'> 🔄️Loding Scan Result.</div>
          )}

          {!loading && scanResult && (
             <ScanResult result={scanResult} />
          )}


          {/*File Scan*/}

          <div>
            <DragDrop />
          </div>
          <div className='px-6 py-4 grid gap-4'>
            <h1 className='text-xl font-bold'>Scanning Tips:</h1>
            <p className='font-semibold text-center text-gray-400'>For best results, ensure the URL is complete and accurate. For file scans, the maximum file size is 50MB. Larger files may take longer to scan.</p>
          </div>


        </div>
      </div>




    </div>
  )
}

export default Scan
