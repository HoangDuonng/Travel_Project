const {
    uploadSingleFile,
    uploadMultipleFiles,
} = require('../services/uploadService');


    
const postUploadSingleFileAPI = async (req, res) => {
    console.log('Check file: ', req.file);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }

    // Lấy loại ảnh từ request body
    const imageType = req.body.type; // "avatar" hoặc "cover"

    // Kiểm tra loại ảnh
    if (imageType !== 'avatar' && imageType !== 'cover_photo') {
        return res.status(400).send('Invalid image type');
    }

    // Gọi hàm tải lên file
    let result = await uploadSingleFile(req.files.image, imageType);

    return res.status(200).json({
        message: 'success',
        data: result,
    });
};

const postUploadMultipleFileAPI = async (req, res) => {
    console.log('Check files: ', req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }

    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            message: 'success',
            data: result,
        });
    } else {
        return await postUploadSingleFileAPI(req, res);
    }
};

module.exports = { postUploadSingleFileAPI, postUploadMultipleFileAPI };
