import React, { useState } from 'react';
import url from '../../utils/url';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Add01Icon, ImageAdd02Icon } from 'hugeicons-react';
import { FaRegImages } from 'react-icons/fa';
import { BiImageAdd, BiSolidFileImage, BiSolidImageAdd } from 'react-icons/bi';
import { GrImage } from 'react-icons/gr';

function PostImgUpload({ postId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(''); // State to store the image preview URL
  const [uploadStatus, setUploadStatus] = useState('');
  const [cookies, setCookie] = useCookies(['socio-pf']);

  // Handle file selection
  const handleFileChange = (event) => {
    event.preventDefault(); 
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL for preview
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    event.preventDefault(); 
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
      toast.loading("Uploading the image")
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
    <div className='flex flex-col w-full justify-end items-end'>
      <Toaster />
      <input
        type="file"
        onChange={handleFileChange}
        id="fileInput"
        className='hidden'
        accept='.jpg,.jpeg,.png,.svg'
      />
      <label htmlFor="fileInput" className="cursor-pointer p-2 dark:text-white rounded-full text-black">
        <BiImageAdd />
      </label>
      
      {/* Image preview */}
      {previewUrl && (
        <div className="mt-4">
          <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded" />
        </div>
      )}

      {/* Submit button for upload */}
      {selectedFile && (
        <button onClick={handleUpload} className="mt-2 p-2 dark:bg-slate-500 dark:hover:bg-slate-700 bg-yellow-100 hover:bg-yellow-400 text-black dark:text-white  rounded">
          Upload Image
        </button>
      )}

      {/* Optional: Display upload status message */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default PostImgUpload;
