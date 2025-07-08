import React from 'react'

const ScanResult = ({ result }) => {
  // if (!result) return null;

  const status = result?.attributes?.status;
  const stats = result?.attributes?.stats || {};
  const verdict = stats.malicious > 0 ? "Malicious" : stats.suspicious > 0 ? "Suspicious" : "Safe";
  const verdictclass = verdict === 'Malicious' || verdict === 'Suspicious' ? 'text-red-500' : verdict === 'Safe' ? 'text-green-600' : 'text-yellow-500'

  return (
    <div className='p-6 text-center'>
      <div className='p-6 bg-[#1e1e1e] rounded-xl text-white mt-6 grid justify-center items-center'>
        <h2 className='text-3xl font-bold mb-4 text-yellow-400'>Scan Result</h2>

        <div className='flex  gap-20 mt-5 justify-center'>
          <p className='text-xl font-bold'><strong>Status:</strong> {status || "Unknown"}</p>
          <p className='text-xl font-bold flex gap-1'>Vardict:<strong className={verdictclass}>{verdict || "Unknown"}</strong></p>
        </div>


        <div className='md:flex gap-4 justify-center mt-6 grid grid-cols-2'>
          <p className='border-2 border-l-4 rounded-lg border-white p-4 grid gap-2 text-center border-l-red-500'><strong className='text-lg'>Harmless:</strong>{stats.harmless ?? 'N/A'}</p>
          <p className='border-2 border-l-4 rounded-lg border-white p-4 grid gap-2 text-center border-l-orange-500'><strong className='text-lg'>Malicious:</strong> {stats.malicious ?? 'N/A'}</p>
          <p className='border-2 border-l-4 rounded-lg border-white p-4 grid gap-2 text-center border-l-green-500'><strong className='text-lg'>Suspicious:</strong> {stats.suspicious ?? 'N/A'}</p>
          <p className='border-2 border-l-4 rounded-lg border-white p-4 grid gap-2 text-center border-l-gray-400'><strong className='text-lg'>Undetected:</strong> {stats.undetected ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;
