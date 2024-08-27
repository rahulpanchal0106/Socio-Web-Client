import React, { useState } from 'react';
import url from '../../utils/url';
import { useCookies } from 'react-cookie';


function FileUpload({username}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [cookies,setCookie] = useCookies(['socio-pf'])

  console.log(")))))))))))))))) 000000000000",username)
  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
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
      setUploadStatus('File uploaded successfully!');
      console.log('File uploaded:', data);
      setCookie('socio-pf',data.data.id)
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload File to Google Drive</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default FileUpload;
