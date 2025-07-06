import React from 'react'

const ScanResult = ({ result }) => {
  if (!result) return null;

  const status = result?.attributes?.status;
  const stats = result?.attributes?.stats || {};
  const verdict = stats.malicious > 0 ? "Malicious" : stats.suspicious > 0 ? "Suspicious" : "Safe"; 

  return (
    <div className='p-6'>
      <div className='p-6 bg-[#1e1e1e] rounded-xl text-white mt-6'>
        <h2 className='text-2xl font-bold mb-4'>Scan Result</h2>
        <p><strong>Status:</strong> {status || "Unknown"}</p>
        <p><strong>Verdict:</strong> {verdict || "Unknown"}</p>

        <div className='mt-4 grid gap-2'>
          <p><strong>Harmless:</strong> {stats.harmless ?? 'N/A'}</p>
          <p><strong>Malicious:</strong> {stats.malicious ?? 'N/A'}</p>
          <p><strong>Suspicious:</strong> {stats.suspicious ?? 'N/A'}</p>
          <p><strong>Undetected:</strong> {stats.undetected ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;
