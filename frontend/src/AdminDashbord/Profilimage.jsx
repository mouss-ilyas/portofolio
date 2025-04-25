import { useState, useRef } from "react";
import { API_URL } from "../config";

export default function Profilimage() {
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(false);
  const [uploadedCv, setUploadedCv] = useState(false);
  const [error, setError] = useState('');
  const imageInputRef = useRef(null);
  const cvInputRef = useRef(null);

  const token = localStorage.getItem("jwt_token");
  const linkOfImage = `${API_URL}/imagerouter/image`;
  const linkOfCv = `${API_URL}/imagerouter/cv`;

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setError('');
    if (type === "image") {
      setImage(selectedFile);
      setUploadedImage(false);
    } else if (type === "cv") {
      setCv(selectedFile);
      setUploadedCv(false);
    }
  };

  const uploadFile = async (file, url, onSuccess) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
        setError('');
      } else {
        setError(data.message || 'Upload failed.');
      }
    } catch (err) {
      setError('Error uploading file.');
      console.error(err);
    }
  };

  const handleImageUpload = () => {
    if (!image) {
      setError('Please select an image.');
      return;
    }
    uploadFile(image, `${API_URL}/imagerouter/upload`, () => {
      setUploadedImage(true);
      setImage(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
    });
  };

  const handleCvUpload = () => {
    if (!cv) {
      setError('Please select a CV.');
      return;
    }
    uploadFile(cv, `${API_URL}/imagerouter/cv`, () => {
      setUploadedCv(true);
      setCv(null);
      if (cvInputRef.current) cvInputRef.current.value = "";
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, "image")}
        ref={imageInputRef}
      />
      <button
        onClick={handleImageUpload}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload Image
      </button>

      {uploadedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Uploaded Image:</h3>
          <img
            src={`${linkOfImage}?t=${Date.now()}`}
            alt="Uploaded"
            className="mt-2 rounded shadow"
          />
        </div>
      )}

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">Upload CV (PDF)</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => handleFileChange(e, "cv")}
        ref={cvInputRef}
      />
      <button
        onClick={handleCvUpload}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Upload CV
      </button>

     
        <div className="mt-4">
          <h3 className="text-lg font-medium">Uploaded CV:</h3>
          <a
            href={linkOfCv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View CV
          </a>
        </div>
      

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
