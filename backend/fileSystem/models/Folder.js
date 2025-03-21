const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  folderName: { type: String, required: true },
  folderPath: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Folder", FolderSchema);
