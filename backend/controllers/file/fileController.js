const File = require ('../../models/file.js');
const { formatBytes } =require ('../../extra/formatBytes.js');

exports.uploadFileController = async (req, res) => {
  try {
    const file = req.file;
    const { folder } = req.body;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    if (!req.user) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    // Ensure folder exists before uploading a file to it
    if (folder && folder !== "/") {
      const folderExists = await File.findOne({
        userId: req.user.id,
        folder: folder.trim(),
        contentType: "folder",
      });

      if (!folderExists) {
        return res.status(400).json({ msg: "Folder does not exist" });
      }
    }

    const newFile = new File({
      userId: req.user.id,
      filename: file.originalname,
      folder: folder ? folder.trim() : "/", // Store inside folder if provided
      path: file.path,
      size: file.size,
      uploadDate: new Date(),
      data: file.buffer.toString("base64"),
      contentType: file.mimetype,
    });

    const savedFile = await newFile.save();

    res.status(201).json({ msg: "File uploaded successfully", file: savedFile });
  } catch (error) {
    res.status(500).json({ msg: "Error saving file", error: error.message });
  }
};



exports.getAllFilesController = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });

    if (files.length === 0) {
      return res.status(404).json({ msg: 'No files found' });
    }

    res.json(files); 
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getSingleFileController = async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.id, userId: req.user.id });

    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    res.json(file);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getRecentFilesController = async (req, res) => {
  try {
    const recentFiles = await File.find({ userId: req.user.id })
      .sort({ uploadDate: -1 })
      .limit(4);

    if (recentFiles.length === 0) {
      return res.status(404).json({ msg: 'No file found' });
    }

    res.status(200).json({ files: recentFiles });
  } catch (error) {
    
    res.status(500).json({ msg: 'Error fetching recent files', error: error.message });
  }
};


exports.deleteFileController = async (req, res) => {
  try {
    const fileId = req.params.id;  
    const file = await File.findOne({ _id: fileId, userId: req.user.id });

    if (!file) {
      return res.status(404).json({ msg: 'File not found or unauthorized' });
    }

    await File.deleteOne({ _id: fileId }); 

    res.status(200).json({ msg: 'File deleted successfully' });
  } catch (error) {
    
    res.status(500).json({ msg: 'Error deleting file', error: error.message });
  }
};

exports.renameFileController = async (req, res) => {
  try {
    const fileId = req.params.id; 
    const { newFilename } = req.body; 
    if (!newFilename || typeof newFilename !== 'string' || newFilename.trim() === '') {
      return res.status(400).json({ msg: 'New filename is required and must be a non-empty string' });
    }
    const file = await File.findOne({ _id: fileId, userId: req.user.id });   

    if (!file) {
      return res.status(404).json({ msg: 'File not found or unauthorized' });
    }
       
    file.filename = newFilename.trim(); 
    await file.save(); 

    res.status(200).json({ msg: 'File renamed successfully', file });
  } catch (error) {
    console.error('Error renaming file:', error);
    res.status(500).json({ msg: 'Error renaming file', error: error.message });
  }
};

exports.getUserStorageUsageController = async (req, res) => {
  try {
    const totalStorageLimit = 100 * 1024 * 1024; 

    const files = await File.find({ userId: req.user.id });
    const usedStorage = files.reduce((acc, file) => acc + file.size, 0);
    const availableStorage = totalStorageLimit - usedStorage;

    res.json({
      usedStorage: formatBytes(usedStorage),
      availableStorage: formatBytes(availableStorage),
      totalStorage: formatBytes(totalStorageLimit)
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.createFolderController = async (req, res) => {
  try {
    const { folderName, parentFolder } = req.body;

    if (!folderName || typeof folderName !== "string" || folderName.trim() === "") {
      return res.status(400).json({ msg: "Folder name is required and must be a non-empty string" });
    }

    const sanitizedFolderName = folderName.trim();

    // Check if the folder already exists
    const existingFolder = await File.findOne({
      userId: req.user.id,
      folder: sanitizedFolderName,
      contentType: "folder",
    });

    if (existingFolder) {
      return res.status(400).json({ msg: "Folder name already exists" });
    }

    // Create new folder
    const newFolder = new File({
      userId: req.user.id,
      folder: sanitizedFolderName,
      filename: sanitizedFolderName, // Displayed as folder name
      contentType: "folder",
      size: 0, // Folders don’t have size
      uploadDate: new Date(),
    });

    await newFolder.save();

    res.status(201).json({ msg: "Folder created successfully", folder: newFolder });
  } catch (error) {
    res.status(500).json({ msg: "Error creating folder", error: error.message });
  }
};
