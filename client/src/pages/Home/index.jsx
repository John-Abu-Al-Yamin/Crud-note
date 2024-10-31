import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Note App</h1>
      <p className="text-lg text-gray-600 mb-6">
        Organize your thoughts and manage your tasks with ease.
      </p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Get Started
      </button>
    </div>
  );
};

export default Home;
