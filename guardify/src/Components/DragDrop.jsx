import React from 'react'
import { useCallback } from "react"
import { useDropzone } from 'react-dropzone';


const DragDrop = () => {
    
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log('Dropped file:', file);
      // You can upload or preview file here
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    },
  });


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
                <button className='bg-[#303030] p-2 px-6 w-fit  rounded-xl'>Scan</button>
            </div>
            
        </div>
    )
}

export default DragDrop
