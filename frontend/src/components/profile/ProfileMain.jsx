import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router";
import { useGetUserQuery } from "../../store/api";
import LogoutButton from "../Auth/LogoutButton ";
const ProfileMain = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserQuery();
  // Redirect to login if there's an error or no user data
  if (isError || (!isLoading && !user)) {
    navigate("/login");
  }
  // Show a loading message while fetching data
  if (isLoading) {
    return <p>Loading user data...</p>;
  }
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col items-center">
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full mt-4"
          />
        )}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          {user.username}!
        </h1>
      </div>
      <Link to={"/profileEdit"} className="bg-gray-300  text-center px-4 py-2 rounded">Edit Profile</Link>
      <Link to={"/profileSetting"} className="bg-gray-300  text-center px-4 py-2 rounded">Setting</Link>
      <Link to={"/ProfileSupport"} className="bg-gray-300  text-center px-4 py-2 rounded">Support</Link>
      <LogoutButton />
      <Navbar />
    </div>
  );
};

export default ProfileMain;
