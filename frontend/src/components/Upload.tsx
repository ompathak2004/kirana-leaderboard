import React, { ChangeEvent } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { backend_url } from '../config';

const Upload: React.FC = () => {
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
//fronted is adHoc and not secure there will be login and userid hardcoded for now
    const userId = 'user123'; 
    await axios.post(`${backend_url}/api/v1/upload`, { userId, imageUrl });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Shelf Image</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
    </div>
  );
};

export default Upload;