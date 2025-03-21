import { useState } from "react";
import { useCreateFolderMutation } from "../../store/folder";


const CreateFolder = () => {
  const [folderName, setFolderName] = useState("");
  const [createFolder, { isLoading, error }] = useCreateFolderMutation();

  const handleCreateFolder = async () => {
    if (!folderName) return alert("Folder name is required!");

    try {
      await createFolder(folderName).unwrap();
      alert("Folder created successfully!");
      setFolderName("");
    } catch (err) {
      console.error("Failed to create folder:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Enter folder name"
      />
      <button onClick={handleCreateFolder} disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Folder"}
      </button>
      {error && <p>Error: {error.data?.error || "Something went wrong"}</p>}
    </div>
  );
};

export default CreateFolder;
