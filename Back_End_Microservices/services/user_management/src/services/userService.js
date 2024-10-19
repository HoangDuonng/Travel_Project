const db = require('../config/database');


const getUserByIdService = async (id) => {
    try {
        const sql = 'SELECT * FROM users WHERE id = ?';
        let [rows, fields] = await db.query(sql, [id]);

        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

const getAllUserService = async () => {
    try {
        let [result, fields] = await db.query('select * from users');
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

        return {
            message: 'success',
            data: rows,
        };
    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            if (e.sqlMessage.includes('username')) {
                console.log('error: Username already exists');
                return {
                    message: 'Fail',
                    error: 'Username already exists'
                };
            } else if (e.sqlMessage.includes('email')) {
                console.log('error: Email already exists');
                return {
                    message: 'Fail',
                    error: 'Email already exists'
                };
            }
        }
        console.log('error: ', e);
        return {
            message: 'Fail',
            error: 'Failed to insert user'
        };
    }
};

const updateAUserService = async (data) => {
    try {
        
        // console.log('check avatar: ', data.avatarUrl);
        // console.log('check cover photo: ', data.coverPhotoUrl);
        let socialsJson = JSON.stringify(data.socials);
        const sql = `
            UPDATE users SET email = ?, username = ?, password = ?, displayname = ?, phone = ?, bio = ?, socials = ?, role = ?, avatar = ?, cover_photo = ? WHERE id = ?
        `;

        // Thực hiện câu lệnh SQL
        await db.query(sql, [
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

const findUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [result, fields] = await db.query(sql, [email]);
    return result[0];
};

const updateRefreshToken = async (userId, refreshToken) => {
    const sql = 'UPDATE users SET refresh_token = ? WHERE id = ?';
    await db.query(sql, [refreshToken, userId]);
};
  
const checkRefreshToken = async (refreshToken) => {
    try {
        const sql = 'SELECT * FROM users WHERE refresh_token = ?';
        const [result, fields] = await db.execute(sql, [refreshToken]);

        if (result.length === 0) {
            return null;
        }
        return result[0].refresh_token;
        
    } catch (error) {
        console.error("Error checking refresh token:", error);
        throw new Error("Database query failed"); // Hoặc xử lý theo cách bạn muốn
    }
};

const clearRefreshToken = async (userId) => {
    const sql = 'UPDATE users SET refresh_token = ? WHERE id = ?';
    await db.query(sql, [null, userId]);
};

module.exports = {
    getUserByIdService,
    getAllUserService,
    createAUserService,
    updateAUserService,
    deleteAUserService,
    findUserByEmail,
    updateRefreshToken,
    checkRefreshToken,
    clearRefreshToken,
};
