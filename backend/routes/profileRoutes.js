const express = require("express");
const { deleteAccount } = require("../controllers/profile/deleteAccountControllers");
const { editProfile } = require("../controllers/profile/editProfileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.delete("/delete-account", authMiddleware, deleteAccount);
router.put("/edit-profile", authMiddleware, editProfile);

module.exports = router; // Use `module.exports`
