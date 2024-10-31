import { useRef } from "react";
import { useAuth } from "../../context/Auth";

const Register = () => {
  const { registerUser } = useAuth();

  const registerRef = useRef(null);

  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(registerRef.current);

    const data = Object.fromEntries(formData.entries());
    registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h1>
        <form className="space-y-4" onSubmit={handelSubmit} ref={registerRef}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
