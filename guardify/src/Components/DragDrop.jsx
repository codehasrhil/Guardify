import React from 'react'
import { useCallback, useState } from "react"
import { useDropzone } from 'react-dropzone';
import { ApiKey } from './../Config/Scrip';



const DragDrop = ({ onScanResult}) => {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log("Dropped file:", file);
      setFile(file);
      setResult(null)
      console.log("file got");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/zip': [],
    },
  });

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch('/.netlify/functions/scanFile', {
        method: "POST",
        body: formData,
        
      });
      console.log("file sedd to netligf")

      if(!res.ok) {
        const errorBody = await res.text();
        console.error(`uploade faild with status ${res.status}:`, errorBody);
        alert(`scan faild. server responded with status ${res.status}.`);
        setLoading(false)
        return;
      }

      const uploadResult = await res.json();
      const analysisId = uploadResult?.data?.id;

      const pollResult = async () => {
        const analysisRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
          headers: {
            "x-apikey": ApiKey,
          },
        });


      const resultData = await analysisRes.json();
      const status = resultData?.data?.attributes?.status;

      
        if(!analysisId){
          console.error("Invalid response from virusTotal:",uploadResult);
          alert("scan failed: No analysis Id returned.");
          setLoading(false);
          return;
        }


      if (status === 'completed') {
        console.log("scan completed:", resultData)
        setResult(resultData);
        onScanResult?.(resultData.data);
        setLoading(false);
      } else {
        console.log("scan still in progress,retrying...");
        setTimeout(pollResult, 3000);
      }
    }
      pollResult();
    } catch (error) {
      console.error("Scan failed:", error);
      setLoading(false);
    }

  };

  return (
    <div className='px-6 pt-12 grid gap-6 pb-6 '>
      <h1 className='text-4xl font-bold'>file Scan</h1>
      <div
        {...getRootProps()}
        className="border-3 font-bold text-xl  border-dashed border-amber-300 p-10 text-center min-h-[200px] flex justify-center items-center w-full  rounded-md"
      >
        <input {...getInputProps()} />
        {file ? (
          <div>
            <p><strong>Uploaded File:</strong></p>
            {file.type.startsWith('Image/')  ? (
                <img src={URL.createObjectURL(file)} alt="Preview" style={{maxWidth: '100%', maxHeight:'200px'}} />
            ) : (
              <p>{file.name}</p>
            )        
          }
          </div>
       ):isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files (PDF, Image, etc.)</p>
        )}
      </div>
      
       
      <div className='grid justify-center'>
        <button onClick={handleScan} className='bg-[#303030] p-2 px-6 w-fit  rounded-xl'>{loading ? 'Scanning...' : "Scan"}</button>
      </div>

      {loading && (
            <div className='text-center text-gray-300 mt-6'> 🔄️Loding Scan Result.</div>
      )}


    </div>
  )
}

export default DragDrop
