import React, { useState } from "react";
import { useChangePasswordMutation } from "../../../store/api";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm new password do not match.");
      return;
    }

    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }).unwrap(); // Unwrap to handle errors properly

      setSuccessMessage(response.msg); // Show success message from backend
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err.data?.msg || "Something went wrong. Please try again."); // Display API error message
    }
  };

  return (
    <div>
      <form onSubmit={handlePasswordChange}>
        <input
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          className="border mt-5 px-2 py-2 rounded text-black"
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border mt-5 px-2 py-2 rounded text-black"
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="border mt-5 px-2 py-2 rounded text-black"
          required
        />
        <br />
        <br />
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button
          className="bg-black text-white px-2 py-2 rounded-lg"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
