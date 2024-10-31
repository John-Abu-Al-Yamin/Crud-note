import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spiner";

const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [loadingbtn, setLoadingbtn] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();

      if (data.success) {
        setTitle(data.data.title);
        setDescription(data.data.description);
        setColor(data.data.color);
      }
    } catch (error) {
      console.error("Failed to fetch note:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingbtn(true);

    const note = { title, description, color };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(note),
        }
      );

      const data = await res.json();

      if (data.success) {
        setTitle("");
        setDescription("");
        setColor("#ffffff");
        navigate("/notes");
      } else {
        console.error("Failed to update note:", data.message);
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      setLoadingbtn(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update a Note
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <select
              value={color}
              name="color"
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="#FFFFFF">White</option>
              <option value="#A1BE95">Soft Green</option>
              <option value="#F5F5DC">Beige</option>
              <option value="#8AAAE5">Light Blue</option>
              <option value="#990011">Cherry Red</option>
              <option value="#FF6F61">Coral</option>
              <option value="#2C5F2D">Forest Green</option>
              <option value="#D3D3D3">Light Gray</option>
            </select>
          </div>

          <button
            disabled={loadingbtn}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loadingbtn ? <Spinner /> : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
