import React, { useState } from 'react';
import url from '../../utils/url';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Add01Icon } from 'hugeicons-react';

function PostImgUpload({ postId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [cookies, setCookie] = useCookies(['socio-pf']);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      toast.loading("Uploading image");
      setTimeout(handleUpload, 1000);  // Directly call handleUpload after delay
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.dismiss();
      toast.error("No file selected");

      return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowedMimeTypes.includes(selectedFile.type)) {
      toast.error("Only .jpeg, .png, and .svg files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('postId', postId);

    try {
      const response = await fetch(url + '/upload_pi', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.dismiss();
      toast.success("Image Uploaded");
      setUploadStatus('File uploaded successfully!');
      console.log('File uploaded:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.dismiss();
      toast.error("Failed to upload Image");
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <Toaster />
      <input
        type="file"
        onChange={handleFileChange}
        id="fileInput"
        className='hidden'
        accept='.jpg,.jpeg,.png,.svg'
      />
      <label htmlFor="fileInput" className="cursor-pointer p-2 rounded-full text-white">
        <Add01Icon />
      </label>
    </div>
  );
}

export default PostImgUpload;
