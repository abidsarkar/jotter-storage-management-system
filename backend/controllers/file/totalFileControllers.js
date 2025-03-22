const File = require("../../models/file");

// Get total counts of folders, notes, PDFs, and images
exports.getTotalFileNumberController = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure the request is authenticated

    const totalFolders = await File.countDocuments({ userId, contentType: "folder" });
    const totalNotes = await File.countDocuments({ 
      userId, 
      contentType: { $in: ["text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] } 
    });
    const totalPDFs = await File.countDocuments({ userId, contentType: "application/pdf" });
    const totalImages = await File.countDocuments({ 
      userId, 
      contentType: { $regex: /^image\// } // Matches all image types (image/png, image/jpeg, etc.)
    });

    res.json({
      totalFolders,
      totalNotes,
      totalPDFs,
      totalImages,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving file stats", error: error.message });
  }
};
