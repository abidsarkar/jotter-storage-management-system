import React, { useState } from 'react';
import { useDeleteAccountMutation } from '../../../store/profileApi';

const DeleteProfile = () => {
  const [deleteAccount, { isLoading, isSuccess, isError, error }] = useDeleteAccountMutation();
  const [deletionMessage, setDeletionMessage] = useState('');

  const handleDelete = async () => {
    try {
      await deleteAccount();
      setDeletionMessage('Account deleted successfully.');
    } catch (err) {
      setDeletionMessage('Failed to delete account.');
      console.error('Account deletion error:', err);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-600 px-2 py-2 cursor-pointer"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Deleting...' : 'Delete Profile'}
      </button>

      {deletionMessage && <p>{deletionMessage}</p>}

      {isError && <p>Error: {error?.data?.message || 'An error occurred'}</p>}

      {isSuccess && <p>Account deleted successfully!</p>}
    </div>
  );
};

export default DeleteProfile;