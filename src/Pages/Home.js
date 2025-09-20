import React from "react";
import GalleryItem from "../Components/GalleryItem";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Gallery</h1>
        <p className="text-gray-600 mb-6">
          Explore amazing images and enjoy our creative carousel!
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Log in
        </button>
      </div>

      <div className="w-full max-w-5xl">
        <GalleryItem />
      </div>
    </div>
  );
};

export default Home;
