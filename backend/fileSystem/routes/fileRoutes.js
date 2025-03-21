const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ensureAuth } = require("../middleware/authMiddleware");
const fileControllers = require("../controllers/fileController");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folderName } = req.body;
    const userFolderPath = path.join(__dirname, `../uploads/${req.user.id}/${folderName}`);

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    cb(null, userFolderPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Routes
router.post("/create-folder", ensureAuth, fileControllers.createFolder);
router.post("/upload", ensureAuth, upload.single("file"), fileControllers.uploadFile); // Ensure field name is "file"
router.get("/storage-stats", ensureAuth, fileControllers.getStorageStats);

module.exports = router;