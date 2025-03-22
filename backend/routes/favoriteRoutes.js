const express = require("express");
const {
  getAllFilesByDate,
} = require("../controllers/favorite/calenderWiseFileSelectController");
const {
  toggleFavorite,
  getFavoriteFiles,
} = require("../controllers/favorite/favoriteController");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();
// 🗂️ Get all files by date
router.get("/date/:date", getAllFilesByDate);

// ⭐ Get favorite files
router.get("/allFavorites", authMiddleware,getFavoriteFiles);
//toggle favorite
router.get("/toggleFavorite/:id",authMiddleware, toggleFavorite);
module.exports = router;
