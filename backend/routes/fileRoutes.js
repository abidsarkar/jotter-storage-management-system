const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  uploadFileController,
  getAllFilesController,
  getRecentFilesController,
  renameFileController,
  deleteFileController,
  getUserStorageUsageController,
  getSingleFileController,
  createFolderController,
} = require("../controllers/file/fileController.js");
const {
  getImagesController,
  getPdfsController,
  getNotesController,
  getFoldersController,
  getFileStorageCountController,
} = require("../controllers/file/getFilesSeparatelyController.js");
const {getTotalFileNumberController} = require("../controllers/file/totalFileControllers.js")
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
});
router.post("/create-folder", authMiddleware, createFolderController);
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFileController
);
router.get("/all", authMiddleware, getAllFilesController);
router.get("/single/:id", authMiddleware, getSingleFileController);
router.get("/recent", authMiddleware, getRecentFilesController);
router.put("/rename/:id", authMiddleware, renameFileController);
router.delete("/deleteOne/:id", authMiddleware, deleteFileController);
router.get(
  "/getTotalUsagesStorageCount",
  authMiddleware,
  getUserStorageUsageController
);

// Get files separately
router.get("/images", authMiddleware, getImagesController);
router.get("/pdfs", authMiddleware, getPdfsController);
router.get("/notes", authMiddleware, getNotesController);
router.get("/folders", authMiddleware, getFoldersController);
router.get(
  "/storageUseSeparately",
  authMiddleware,
  getFileStorageCountController
);
router.get("/totalFile", authMiddleware, getTotalFileNumberController);

module.exports = router;
