import { useRef } from "react";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const { loginUser } = useAuth();

  const loginRef = useRef(null);

  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(loginRef.current);

    const data = Object.fromEntries(formData.entries());
    console.log(data);
    loginUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handelSubmit} ref={loginRef}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
