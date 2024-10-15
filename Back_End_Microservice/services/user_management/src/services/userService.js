const db = require('../config/database');


const getUserByIdService = async (id) => {
    try {
        const sql = 'SELECT * FROM users WHERE id = ?';
        let [rows, fields] = await db.query(sql, [id]);

        if (rows.length > 0) {
            return rows[0]; // Trả về user nếu tìm thấy
        } else {
            return null; // Không tìm thấy user
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

const getAllUserService = async () => {
    try {
        let [result, fields] = await db.query('select * from users');
        console.log('check data: ', result);
        if (result === null) {
            return 'Do not find any user';
        } else {
            return result;
        }
    } catch (e) {
        console.log('error: ', e);
        return 'Failed to find user';
    }
};

const createAUserService = async (data) => {
    try {
        let socialsJson = JSON.stringify(data.socials);
        console.log('Socials JSON: ', socialsJson);
        const sql =
            'INSERT INTO users (email, username, password, displayname, phone, bio, socials, role, avatar, cover_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Thực hiện câu lệnh SQL
        let [result, fields] = await db.query(sql, [
            data.email,
            data.username,
            data.password,
            data.displayname,
            data.phone,
            data.bio,
            socialsJson, // intagram, facebook
            data.role,
            data.avatar,
            data.cover_photo,
        ]);
        const insertedId = result.insertId;

        const [rows, fields2] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [insertedId]
        );

        console.log('res: ', rows);

        return rows;
    } catch (e) {
        console.log('error: ', e);
        return 'Failed to insert user';
    }
};

const updateAUserService = async (data) => {
    try {
        
        console.log('check avatar: ', data.avatarUrl);
        console.log('check cover photo: ', data.coverPhotoUrl);
        let socialsJson = JSON.stringify(data.socials);
        const sql = `
            UPDATE users SET email = ?, username = ?, password = ?, displayname = ?, phone = ?, bio = ?, socials = ?, role = ?, avatar = ?, cover_photo = ? WHERE id = ?
        `;

        // Thực hiện câu lệnh SQL
        let [result, fields] = await db.query(sql, [
            data.email,
            data.username,
            data.password,
            data.displayname,
            data.phone,
            data.bio,
            socialsJson, // intagram, facebook
            data.role,
            data.avatarUrl || data.existingAvatar,
            data.coverPhotoUrl || data.existingCoverPhoto, 
            data.id,
        ]);
        const [rows, fields2] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [data.id]
        );

        // console.log('res: ', result);

        return rows;
    } catch (e) {
        return 'Failed to update user';
    }
};

const deleteAUserService = async (id) => {
    try {
        const sql = 'DELETE FROM users WHERE id = ?';
        let [result, fields] = await db.query(sql, [id]);
        if (result.affectedRows === 0) {
            return 'No user found to delete';
        }

        return 'User deleted successfully';
    } catch (e) {
        return 'Failed to delete user';
    }
};

module.exports = {
    getUserByIdService,
    getAllUserService,
    createAUserService,
    updateAUserService,
    deleteAUserService,
};