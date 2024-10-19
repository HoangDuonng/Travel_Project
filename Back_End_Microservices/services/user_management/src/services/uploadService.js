const path = require('path');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const uploadSingleFile = async (fileObject, type) => {
    //let uploadPath = __dirname + fileObject.name;
    console.log('check dirname: ', __dirname);
    let uploadPath = path.resolve(__dirname, '../public/images');

    // Kiểm tra và tạo thư mục nếu không tồn tại
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    let extName = path.extname(fileObject.name);
    // let baseName = path.basename(fileObject.name, extName);
    // let finalName = `${baseName}-${Date.now()}${extName}`;

    const imageType = type === 'avatar' ? 'avatar' : 'cover_photo';
    let userId = 7;
    // user_Id lấy qua token
    let finalName = `user_${userId}_${imageType}_${uuidv4()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null,
        };
    } catch (error) {
        console.log('Check err', error);
        return {
            status: 'failed',
            path: null,
            error:  error.message,
        };
    }
};

const uploadMultipleFiles = async (filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, '../public/images');

        // Kiểm tra và tạo thư mục nếu không tồn tại
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            let extName = path.extname(filesArr[i].name);
            // let baseName = path.basename(filesArr[i].name, extName);
            let finalName = `user_${userId}_${uuidv4()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;

            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null,
                });
                countSuccess++;
            } catch (error) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: filesArr[i].name,
                    error: error.message,
                });
            }
        }
        return {
            countSuccess: countSuccess,
            detail: resultArr,
        };
    } catch (err) {
        console.log(err);
        return {
            status: 'failed',
            message: 'Error during file upload',
            error: err.message,
        };
    }
};

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles,
};
