import React from "react";

const ImageCard = ({ img, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-2">
      <img
        src={`${process.env.REACT_APP_API_URL || 'https://melody-admin-backend.vercel.app'}${img.url}`}
        alt={img.title}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <p className="text-gray-700 font-medium text-center mb-2 truncate">{img.title}</p>
      <div className="flex justify-between">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="flex-1 mx-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Up
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="flex-1 mx-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Down
        </button>
        <button
          onClick={() => onDelete(img._id)}
          className="flex-1 mx-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
