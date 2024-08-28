import React, { useState } from 'react';
import url from '../../utils/url';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Add01Icon, Edit01Icon, Edit02Icon, ImageAdd01Icon } from 'hugeicons-react';


function PostImgUpload({username}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [cookies,setCookie] = useCookies(['socio-pf'])

  console.log(")))))))))))))))) 000000000000",username)
  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    toast.loading("Uploading image")
    setTimeout(()=>handleUpload(),100)
      
  };

  // Handle file upload
  const handleUpload = async () => {
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
      const response = await fetch(url+'/upload_pi', {
        method: 'POST',
        body:formData,
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      toast.dismiss()
      setTimeout(()=>toast.success("Image Uploaded"),100)
      setUploadStatus('File uploaded successfully!');
      console.log('File uploaded:', data);
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
      <input type="file" onChange={handleFileChange} id="fileInput" className='hidden' accept='.jpg,.jpeg,.png,.svg' />
      <label htmlFor="fileInput" className="cursor-pointer  p-2 rounded-full text-white">
        <Add01Icon/>
      </label>
      {/* <button onClick={handleUpload} className="button">Change Profile Picture</button> */}
      {/* <p>{uploadStatus}</p> */}
    </div>
  );
}

export default PostImgUpload;
