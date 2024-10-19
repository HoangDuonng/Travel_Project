const express = require("express");
const router = express.Router();

const {
    verifyToken,
    verifyTokenAndUserAuthorization,
} = require("../middlewares/verifyJWT");

const {
    requestRefreshToken,
} = require("../controllers/authController");

const {
    loginUser,
    logoutUser,
} = require("../controllers/authController");

const {
    getAUser,
    getAllUser,
    createAUser,
    updateAUser,
    deleteAUser,
} = require('../controllers/userController');

const {
    postUploadSingleFileAPI,
    postUploadMultipleFileAPI,
} = require('../controllers/uploadController');

// Upload file
router.post('/file', postUploadSingleFileAPI);
router.post('/files', postUploadMultipleFileAPI);


// User
router.get("/users", verifyToken, getAllUser);
router.get("/user", getAUser);
router.post("/register", createAUser);
router.put("/user", updateAUser);
router.delete("/user", verifyTokenAndUserAuthorization, deleteAUser);


// Auth
router.post("/login", loginUser)
router.post("/logout", verifyToken, logoutUser);

// Refresh token
router.post("/refresh", requestRefreshToken);

module.exports = router;
