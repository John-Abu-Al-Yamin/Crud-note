import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import Notes from "./pages/Notes";
import { useAuth } from "./context/Auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreateNote from "./pages/createNote";
import UpdateNote from "./pages/UpdateNote";


function App() {
  const { user } = useAuth();

  return (
    <div className="">
      <ToastContainer />

      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/add-note" element={<CreateNote />} />
          <Route path="notes/edit-note/:id" element={<UpdateNote />} />
        </Route>

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;
