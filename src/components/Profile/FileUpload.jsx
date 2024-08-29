import React, { useState } from 'react';
import url from '../../utils/url';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Edit01Icon, Edit02Icon, EditUser02Icon, FileEditIcon, ImageAdd01Icon, ImageUpload01Icon } from 'hugeicons-react';
import { BiImageAdd } from 'react-icons/bi';
import { FaEdit, FaRegEdit } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';


function FileUpload({username,src}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [cookies,setCookie] = useCookies(['socio-pf'])
  const [previewUrl, setPreviewUrl] = useState();

  console.log(")))))))))))))))) 000000000000",username)
  // Handle file selection
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if(file){
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = ()=>{
        setPreviewUrl(reader.result);
      }
      reader.readAsDataURL(file)
    }
    
    // setTimeout(()=>handleUpload(),100)
      
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault()
    toast.loading("Uploading new profile picture")
    if (!selectedFile) {
      toast.error("No file selected")
      setTimeout(()=>toast.dismiss(),1000)
      return;
    }
    const allowedMimeTypes = ["image/jpeg","image/png","image/svg"]
      if(!allowedMimeTypes.includes(selectedFile.type)){
        toast.error("Only .jpeg, .png and .svg are allowed");
        setTimeout(()=>toast.dismiss(),1000)
        return;
    }


    // Create FormData object to send the file as multipart/form-data
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('username', username); 

    try {
      // Send a POST request to your server using fetch
      const response = await fetch(url+'/upload_pf', {
        method: 'POST',
        body:formData,
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      toast.dismiss()
      setTimeout(()=>toast.success("Profile Picture Uploaded"),100)
      setUploadStatus('File uploaded successfully!');
      console.log('File uploaded:', data);
      setCookie('socio-pf',data.data.id)
    } catch (error) {
      console.error('Error uploading file:', error);
      setTimeout(()=>toast.error("Failed to upload profile picture"),1000)
      toast.dismiss()
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <Toaster/>
      <div className='flex flex-row justify-end items-center '>
        <img className="rounded-full lg:w-48 lg:h-48 w-24 h-24 overflow-hidden border border-solid border-white object-cover lg:mt-20" src={previewUrl?previewUrl:src} alt="Profile" />
        <input type="file" onChange={handleFileChange} id="fileInput" className='hidden' accept='.jpg,.jpeg,.png,.svg' />
        <label htmlFor="fileInput" className="border border-solid border-white cursor-pointer bg-white dark:bg-slate-800 absolute   p-2 rounded-full text-black dark:text-white">
          <FaRegEdit />
        </label>
      </div>

      {/* {previewUrl && (
        <div className="mt-4">
          <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded" />
        </div>
      )} */}
      {selectedFile && (
        <button onClick={handleUpload} className="mt-2 p-2 dark:bg-slate-500 dark:hover:bg-slate-700 bg-yellow-100 hover:bg-yellow-400 text-black dark:text-white  rounded">
          Stage changes
        </button>
      )}
      {/* <p>{uploadStatus}</p> */}
    </div>
  );
}

export default FileUpload;
