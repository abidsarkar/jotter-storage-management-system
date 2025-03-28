const File =require ('../../models/file');  

exports.toggleFavorite = async (req, res) => {
  try {
    const { fileId } = req.params; 
    const userId = req.user.id; 
    let { isFavorite } = req.body;  
    // console.log("File ID:", fileId); 

    if (typeof isFavorite === "string") {
      isFavorite = JSON.parse(isFavorite);
    }
    // console.log("isFavorite :", isFavorite);
    const file = await File.findOneAndUpdate(
      { _id: fileId, userId }, 
      { $set: { isFavorite } }, 
      { new: true } 
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({ message: `File ${isFavorite ? "marked as favorite" : "removed from favorites"}`, file });

  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getFavoriteFiles = async (req, res) => {
  try {
    const userId = req.user.id; 
    const favoriteFiles = await File.find({ userId, isFavorite: true });

    if (!favoriteFiles.length) {
      return res.status(404).json({ message: "No favorite files found" });
    }

    res.json({ favoriteFiles });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


