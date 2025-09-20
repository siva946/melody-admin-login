import React, { useState } from "react";
import API from "../api";

const Imageuploader = ({ onUploaded }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleUpload = async () => {
    if (!files.length) return;
    const uploadedResults = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("image", files[i]);
      const res = await API.post("/images/admin", formData);
      uploadedResults.push(res.data);
    }
    onUploaded(uploadedResults);
    setFiles([]);
    setPreviews([]);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        Upload Images
      </h2>

      {/* Preview Thumbnails */}
      {previews.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap justify-center">
          {previews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`preview-${idx}`}
              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
            />
          ))}
        </div>
      )}

      {/* File Input */}
      <div className="flex gap-2 justify-center items-center mb-3">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0 file:text-sm file:font-semibold
                     file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
        />
      </div>

      {/* Upload Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Imageuploader;
