import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spiner";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#E6E6FA"); // Default to Light Lavender

  const [loadingbtn, setLoadingbtn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoadingbtn(true);
    e.preventDefault();

    const note = { title, description, color };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`,
        {
          method: "POST",
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
        setColor("#E6E6FA"); // Reset to default color
        console.log(data);
        toast.success("Note created successfully");
        navigate("/notes");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("An error occurred while creating the note");
      console.error("Error:", error);
    } finally {
      setLoadingbtn(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create a Note
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
            <option value="#E6E6FA">Light Lavender</option>
            <option value="#FFDAB9">Soft Peach</option>
            <option value="#98FB98">Mint Green</option>
            <option value="#B0E0E6">Powder Blue</option>
            <option value="#008080">Teal</option>
            <option value="#FF7F50">Coral</option>
            <option value="#32CD32">Lime Green</option>
            <option value="#87CEEB">Sky Blue</option>
          </select>
        </div>

        <button
          disabled={loadingbtn}
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {loadingbtn ? <Spinner /> : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
