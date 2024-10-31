import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loading from "../../components/Loading";

const NoteCard = ({ note, index, moveNote, handelDelete }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "note",
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveNote(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "note",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`p-8 w-96 rounded-lg shadow-lg max-w-md mx-auto mt-4 border border-gray-200 transition-transform transform ${
        isDragging ? "opacity-50" : "hover:scale-105"
      }`}
      style={{ backgroundColor: note.color }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {note.title}
      </h2>
      <p className="text-gray-600 mb-4">{note.description}</p>
      <div className="flex justify-center space-x-4">
        <Link
          to={`edit-note/${note._id}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Edit
        </Link>
        <button
          onClick={() => handelDelete(note._id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllNotes = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotes(data.data);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handelDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      getAllNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const moveNote = (fromIndex, toIndex) => {
    const updatedNotes = [...notes];
    const [movedNote] = updatedNotes.splice(fromIndex, 1);
    updatedNotes.splice(toIndex, 0, movedNote);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-gray-500 text-lg mb-4">No notes available</p>
            <Link
              to="add-note"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Note
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <Link
                to="add-note"
                className=" px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Create Note
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note, index) => (
                <NoteCard
                  key={index}
                  note={note}
                  index={index}
                  moveNote={moveNote}
                  handelDelete={handelDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default Notes;
