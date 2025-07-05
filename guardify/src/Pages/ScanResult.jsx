import React from 'react'

const ScanResult = ({ result }) => {

    if (!result) return null;

    const stats = result.attributes.stats;

    return (

        <div className='p-6'>
            <div className='p-6 bg-[#1e1e1e] rounded-xl text-white mt-6'>
                <h2 className='text-2xl font-bold mb-4'>Scan Result</h2>
                <p><strong>Status:</strong> {result.attributes.status}</p>

                <div className='mt-4 grid gap-2'>
                    <p><strong>Harmless:</strong> {stats.harmless}</p>
                    <p><strong>Malicious:</strong> {stats.malicious}</p>
                    <p><strong>Suspicious:</strong> {stats.suspicious}</p>
                    <p><strong>Undetected:</strong> {stats.undetected}</p>
                </div>
            </div>
        </div>
    )
}

export default ScanResult
