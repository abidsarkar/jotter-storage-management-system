const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  folderName: { type: String, required: true },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);
