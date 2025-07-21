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
    // Step 1: Upload the file
    const res = await fetch('/.netlify/functions/scanFile', {
      method: 'POST',
      body: formData,
    });

    const { analysisId } = await res.json();

    console.log("VirusTotal Response:", response.data);

    if (!analysisId) throw new Error("No analysisId received");

    // Step 2: Poll scan result every 3 seconds
    const poll = setInterval(async () => {
      const scanRes = await fetch(`/.netlify/functions/getScanResult?id=${analysisId}`);
      const { result } = await scanRes.json();

      const status = result?.data?.attributes?.status;
      if (status === 'completed') {
        clearInterval(poll);
        setResult(result);
        onScanResult?.(result.data);
        setLoading(false);
      }
    }, 3000);
  } catch (err) {
    console.error("Scan failed:", err);
    alert("Scan failed");
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
