const { uploadSingleFile } = require('../services/uploadService');
const userServices = require('../services/userService');
const bcrypt = require("bcrypt");

// GET ALL USER
const getAllUser = async (req, res) => {
    let result = await userServices.getAllUserService();
    
    return res.status(200).json({
        message: 'success',
        data: result,
    });
};

// GET A USER
const getAUser = async (req, res) => {
    let id = req.body.id;
    let result = await userServices.getUserByIdService(id);
    return res.status(200).json({
        message: 'success',
        data: result,
    });
};


// REGISTER
const createAUser = async (req, res) => {
    try {
        let { email, username, displayname, phone, bio, socials, role } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        let avatar = '';
        let cover_photo = '';
        if (!req.files || Object.keys(req.files).length === 0) {
            // do nothing
        } else {
            let result = await uploadSingleFile(req.files.image);
            // console.log(' check res :', result.path);
            avatar = result.path;
            cover_photo = result.path;
        }

        let data = {
            email: email,
            username: username,
            password: hashed,
            displayname: displayname,
            phone: phone,
            bio: bio,
            socials: socials,
            avatar: avatar,
            cover_photo: cover_photo,
            role: role,
        };

        let result = await userServices.createAUserService(data);
        // Kiểm tra kết quả trả về từ service
        if (result.message === 'success') {
            return res.status(201).json({
                status: 'success',
                data: result.data
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: result.error
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

// UPDATE
const updateAUser = async (req, res) => {
    let { id, email, username, password, displayname, phone, bio, socials, role } = req.body;
    
    let currentUser = await userServices.getUserByIdService(id); 

    if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    let avatarUrl = currentUser.avatar;
    let coverPhotoUrl = currentUser.cover_photo;

    // Kiểm tra và xử lý avatar nếu có
    if (req.files && req.files.avatar) {
        let avatarUploadResult = await uploadSingleFile(req.files.avatar, 'avatar');
        if (avatarUploadResult.status === 'success') {
            avatarUrl = avatarUploadResult.path;
        } else {
            return res.status(400).json({
                message: 'Failed to upload avatar',
                error: avatarUploadResult.error,
            });
        }
    }

    // Kiểm tra và xử lý cover_photo nếu có
    if (req.files && req.files.cover_photo) {
        let coverUploadResult = await uploadSingleFile(req.files.cover_photo, 'cover_photo');
        
        if (coverUploadResult.status === 'success') {
            coverPhotoUrl = coverUploadResult.path;
        } else {
            return res.status(400).json({
                message: 'Failed to upload cover photo',
                error: coverUploadResult.error,
            });
        }
    }
    
    
    // Tạo đối tượng dữ liệu để cập nhật
    let data = {
        id,
        email: email || currentUser.email,
        username: username || currentUser.username,
        password: password || currentUser.password,
        displayname: displayname || currentUser.displayname,
        phone: phone || currentUser.phone,
        bio: bio || currentUser.bio,
        socials: socials || currentUser.socials,
        avatarUrl: avatarUrl || currentUser.avatar,
        coverPhotoUrl: coverPhotoUrl || currentUser.cover_photo,
        role: role || currentUser.role,
    };

    let result = await userServices.updateAUserService(data);
    // console.log('check data: ', result);

    return res.status(200).json({
        message: 'success',
        data: result,
    });
};

const deleteAUser = async (req, res) => {
    let id = req.body.id;

    let result = await userServices.deleteAUserService(id);
    console.log('check data: ', result);
    return res.status(200).json({
        message: 'success',
        data: result,
    });
};

module.exports = { createAUser, updateAUser, deleteAUser, getAllUser, getAUser };
