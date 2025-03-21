const path = require("path");
const fs = require("fs");
const Folder = require("../models/Folder");
const File = require("../models/File");

// **Ensure user folder exists**
const ensureUserFolder = (userId, folderName) => {
  const userFolderPath = path.join(__dirname, `../uploads/${userId}/${folderName}`);
  if (!fs.existsSync(userFolderPath)) {
    fs.mkdirSync(userFolderPath, { recursive: true });
  }
  return userFolderPath;
};

// **Create Folder for User**
exports.createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;
    const userId = req.user.id;

    // Check if folder already exists
    const existingFolder = await Folder.findOne({ userId, folderName });
    if (existingFolder) {
      return res.status(400).json({ error: "Folder name already exists" });
    }

    // Create Folder in File System
    const folderPath = ensureUserFolder(userId, folderName);

    // Save to MongoDB
    const newFolder = new Folder({ userId, folderName, folderPath });
    await newFolder.save();

    res.status(201).json({ message: "Folder created successfully", folder: newFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create folder" });
  }
};

// **Upload File to Specific Folder**
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { folderName } = req.body;
    const userId = req.user.id;

    // Ensure folder exists
    const folderPath = ensureUserFolder(userId, folderName);

    // Save file info in MongoDB
    const newFile = new File({
      userId,
      folderName,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      filePath: path.join(folderPath, req.file.filename),
    });

    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

// **Get User Storage Stats**
exports.getStorageStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const files = await File.find({ userId });

    let totalSize = 0,
      totalImages = 0,
      totalImageSize = 0,
      totalPdfs = 0,
      totalPdfSize = 0,
      totalTextFiles = 0,
      totalTextSize = 0,
      totalFiles = files.length;

    files.forEach((file) => {
      totalSize += file.size;
      if (file.mimetype.startsWith("image")) {
        totalImages++;
        totalImageSize += file.size;
      } else if (file.mimetype === "application/pdf") {
        totalPdfs++;
        totalPdfSize += file.size;
      } else if (file.mimetype.startsWith("text")) {
        totalTextFiles++;
        totalTextSize += file.size;
      }
    });

    const totalFolders = await Folder.countDocuments({ userId });
    const remainingSize = 3 * 1024 * 1024 * 1024 - totalSize; // 3GB limit

    res.json({
      totalFiles,
      totalSize,
      totalImages,
      totalImageSize,
      totalPdfs,
      totalPdfSize,
      totalTextFiles,
      totalTextSize,
      totalFolders,
      remainingSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch storage stats" });
  }
};
