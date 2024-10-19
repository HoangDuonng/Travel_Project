const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userServices = require("../services/userService");
const { cp } = require("fs");

// Tạo AccessToken
const generateAccessToken = (user) => {
  return jwt.sign(
    {
        id: user.id,
        isAdmin: user.role === "admin",
        canManageBlog: user.role === "admin_blog" || user.role === "admin",
        canManageHotel: user.role === "admin_hotel" || user.role === "admin",
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
};

// Tạo RefreshToken
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
        id: user.id,
        isAdmin: user.role === "admin",
        canManageBlog: user.role === "admin_blog" || user.role === "admin",
        canManageHotel: user.role === "admin_hotel" || user.role === "admin",
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "365d" }
  );
};

//LOGIN
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }
    try {
        const user = await userServices.findUserByEmail(email);
        if (!user) {
            res.status(404).json("Incorrect username");
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            res.status(404).json("Incorrect password");
        }
        if (user && validPassword) {
            // Generate access token
            const accessToken = generateAccessToken(user);
            //Generate refresh token
            const refreshToken = generateRefreshToken(user);
            userServices.updateRefreshToken(user.id, refreshToken);
            // //STORE REFRESH TOKEN IN COOKIE
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // deploy set true
                path: "/",
                sameSite: "strict",
            });
            const { password, ...others } = user;
            res.status(200).json({ 
                message: "Login successfully",
                data: {
                    ...others, 
                    accessToken,
                    //refreshToken
                },
            });
        }
    } catch (err) {
        console.error("Login error: ", err);
        res.status(500).json(err);
    }
};

const requestRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) {
        return res.status(401).json("You're not authenticated");
    }

    // check token in database
    const userToken = await userServices.checkRefreshToken(refreshToken);

    console.log("userToken from database:", userToken);
    if (!userToken || userToken !== refreshToken) { 
        return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json("Token is not valid");
        }
        // Create new access token, refresh token and send to user
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // Add refresh token to database
        userServices.updateRefreshToken(user.id, newRefreshToken);

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false, // deploy set true
            path: "/",
            sameSite: "strict",
        });
        res.status(200).json({
            message: "Refresh token successfully",
            data: {
                user,
                access_Token: newAccessToken,
                new_Refresh_Token: newRefreshToken,
            },
        });
    });
};

const logoutUser = async (req, res) => {
    const userId = req.user.id;
    await userServices.clearRefreshToken(userId);
    res.clearCookie("refreshToken");
    res.status(200).json("Logout successfully");
};


module.exports = { loginUser, requestRefreshToken, logoutUser };
