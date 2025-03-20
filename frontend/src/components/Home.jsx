import React from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Jotter</h1>
      <p className="text-gray-700 mb-8">Your Storage Management Solution</p>
      <button
        onClick={() => navigate('/login')}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Get Started for Free
      </button>
    </div>
  );
};

export default Home;