import React from 'react'
import { useCallback , useState } from "react"
import { useDropzone } from 'react-dropzone';


const DragDrop = ({onScanResult}) => {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

    
  const onDrop = useCallback((acceptedFiles) => {
    if(acceptedFiles.length > 0){
      const file = acceptedFiles[0];
      console.log("Dropped file:",file);
      setFile(file);
      setResult(null)
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/zip':[],
    },
  });

  const handleScan = async () => {
    if(!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const  base64Data = reader.result.split(',')[1];
      if (!base64Data) {
         console.error("Failed to extract base64 data");
      return;
    }

      console.log("📤 Sending base64:", base64Data.slice(0, 100));

      try {
        const res = await  fetch('/.netlify/functions/scanFile',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({ file: base64Data }),
        })
        const data = await res.json();
        setResult(data);
        onScanResult?.(data.data);
      } catch (error) {
        console.log("scan faild:",error)
      }
      setLoading(false);
    }
    reader.readAsDataURL(file);
  };

    return (
        <div className='px-6 pt-12 grid gap-6 pb-6 '>
            <h1 className='text-4xl font-bold'>file Scan</h1>
            <div
                {...getRootProps()}
                className="border-3 font-bold text-xl  border-dashed border-amber-300 p-10 text-center min-h-[200px] flex justify-center items-center w-full  rounded-md"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag & drop some files here, or click to select files (PDF, Image, etc.)</p>
                )}
            </div>
            <div className='grid justify-center'>
                <button onClick={handleScan} className='bg-[#303030] p-2 px-6 w-fit  rounded-xl'>{loading ? 'Scanning...' : "Scan"}</button>
            </div>
            
        </div>
    )
}

export default DragDrop
