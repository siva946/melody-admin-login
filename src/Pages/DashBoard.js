import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ImageUploader from "../Components/Imageuploader";
import ImageCard from "../Components/ImageCard";

export default function DashBoard() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/images").then((res) => setImages(res.data))
    .catch((err) => {
      console.error("Failed to fetch images:", err);
      alert("Error fetching images");
    });;
  }, []);

  const handleDelete = async (id) => {
  try {
    await API.delete(`/images/admin/${id}`);
    setImages((prev) => prev.filter((img) => img._id !== id));
  } catch (err) {
    console.error("Failed to delete image:", err);
    alert("Error deleting image");
  }
};

  const moveImageUp = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  };

  const moveImageDown = (index) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Manage Photoshoots
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Uploader */}
      <div className="mb-6">
<ImageUploader onUploaded={(uploaded) => {
  if (Array.isArray(uploaded)) {
    setImages([...images, ...uploaded]);
  } else {
    setImages([...images, uploaded]);
  }
}} />      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <ImageCard
            key={img._id ? `${img._id}-${idx}` : idx}
            img={img}
            onDelete={handleDelete}
            onMoveUp={() => moveImageUp(idx)}
            onMoveDown={() => moveImageDown(idx)}
            isFirst={idx === 0}
            isLast={idx === images.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
