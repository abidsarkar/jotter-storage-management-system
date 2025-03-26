import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import { useGetUserQuery } from "../../store/api";
import { useEditProfileMutation } from "../../store/profileApi";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserQuery();
  const [editProfile, { isLoadingg, isErrorr, isSuccess }] = useEditProfileMutation();

  const [userName, setUserName] = useState(user?.username || ""); // Initialize with current username
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect to login if there's an error or no user data
  if (isError || (!isLoading && !user)) {
    navigate("/login");
  }
  // Show a loading message while fetching data
  if (isLoading) {
    return <p>Loading user data...</p>;
  }
const handleSubmitForm = async (e)=>{
  e.preventDefault();
  try{
    await editProfile({username:userName})
  }catch(err){
    console.log(err.msg);
  }

}
  // Handle form submission
  // const handleSubmitForm = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     // Pass only the username value (not wrapped in an object)
  //     const response = await axios.put(
  //       "http://localhost:5000/api/profile/edit-profile", // Send ID in URL
  //       {
  //         username: userName,
  //       },
  //       { withCredentials: true } // ✅ Include cookies for authentication
  //     );
  //   } catch (error) {
  //     if (axios.isAxiosError(err)) {
  //       setError(err.msg || "axios get data error error");
  //     } else {
  //       setError("something went wrong");
  //     }
  //   }
  // };
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
        <form onSubmit={handleSubmitForm}>
          <input
            placeholder="Enter new User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // Update the username state
            type="text"
            className="border mt-5 px-2 py-2 rounded text-black"
          />
          <br />
          <br />
          <button
            className="bg-black text-white px-2 py-2 rounded-lg"
            type="submit"
          >
            Save the name
          </button>
        </form>
      </div>
      <Navbar />
    </div>
  );
};

export default ProfileEdit;
