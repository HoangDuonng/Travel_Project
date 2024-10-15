const express = require("express");
const router = express.Router();
// const AuthRoute = require("../api/auth/auth-routes");
const {
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
router.get("/users", getAllUser);
router.post("/user", createAUser);
router.put("/user", updateAUser);

module.exports = router;
