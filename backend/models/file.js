const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filename: {
    type: String,
    required: function () {
      return this.contentType !== "folder"; // Ensure files have a name
    },
  },
  folder: {
    type: String,
    default: "/", // Root directory if no folder is specified
  },
  size: {
    type: Number,
    required: function () {
      return this.contentType !== "folder"; // Folders don’t have a size
    },
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  contentType: {
    type: String,
    required: true, // 'folder', 'image/png', 'application/pdf', etc.
  },
  data: {
    type: String,
    required: function () {
      return this.contentType !== "folder"; // Folders don’t need file data
    },
  },
});

// Prevent duplicate folder names for the same user
fileSchema.index({ userId: 1, folder: 1 }, { unique: true, partialFilterExpression: { contentType: "folder" } });

module.exports = mongoose.model("File", fileSchema);
