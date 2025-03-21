import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"; // Import js-cookie

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true, // ✅ Important for sending cookies
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
        navigate("/login");
      }
    };
  
    fetchUser();
  }, [navigate]);
  if (!user) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-2">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.profilePicture && (
            <div>
              <strong>Profile Picture:</strong>
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;