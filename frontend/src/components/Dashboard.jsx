import React from 'react';
import { useNavigate } from 'react-router';


import { useGetUserQuery } from '../store/api';
import LogoutButton from './Auth/LogoutButton ';
import StorageStats from './folder/StorageStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserQuery();

  // Redirect to login if there's an error or no user data
  if (isError || (!isLoading && !user)) {
    navigate('/login');
  }

  // Show a loading message while fetching data
  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Welcome, {user.username}!</h1>
      <p className="text-lg">Email: {user.email}</p>
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full mt-4"
        />
      )}
      
      {/* Use the LogoutButton component */}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;