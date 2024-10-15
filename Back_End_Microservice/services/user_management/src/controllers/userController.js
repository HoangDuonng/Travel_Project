const { uploadSingleFile } = require('../services/uploadService');
const userServices = require('../services/userService');

const getAllUser = async (req, res) => {
    let result = await userServices.getAllUserService();
    
    return res.status(200).json({
        message: 'success',
        data: result,
    });
};

const createAUser = async (req, res) => {

    let { email, username, password, displayname, phone, bio, socials, role } = req.body;

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
        password: password,
        displayname: displayname,
        phone: phone,
        bio: bio,
        socials: socials,
        avatar: avatar,
        cover_photo: cover_photo,
        role: role,
    };

    let result = await userServices.createAUserService(data);
    // console.log('check data: ', result);

    return res.status(200).json({
        message: 'success',
        data: result,
    });
};

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
        EC: 0,
        data: result,
    });
};
module.exports = { createAUser, updateAUser, deleteAUser, getAllUser };