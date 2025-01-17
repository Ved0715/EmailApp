import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { oauth2Client } from "../utils/googleConfig.js";
import jwt from "jsonwebtoken";
import axios from "axios";

// Email validation function
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) return res.status(400).json({
            message: "All fields are required",
            success: false,
        });

        if (!validateEmail(email)) return res.status(400).json({
            message: "Invalid email format",
            success: false,
        });

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({
            message: "User already exists",
            success: false,
        });

        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePhoto = `https://avatar.iran.liara.run/public/boy`;

        await User.create({
            fullname,
            email,
            password: hashedPassword,
            profilePhoto: profilePhoto,
            isVerified: true
        });

        return res.status(200).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({
            message: "All fields are required",
            success: false
        });

        if (!validateEmail(email)) return res.status(400).json({
            message: "Invalid email format",
            success: false,
        });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({
            message: "Invalid email or password",
            success: false,
        });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(401).json({
            message: "Invalid email or password",
            success: false,
        });

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `${user.fullname}, Logged in successfully.`,
            user,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie('token', "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error. Something Went Wrong !!",
      success: false,
    });
  }
};

export const googleLogin = async (req, res, next) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ message: 'Authorization code is required' });
        }

        const googleRes = await oauth2Client.getToken(code);

        if (!googleRes.tokens) {
            return res.status(400).json({
                message: "Google login failed due to googleRes",
                success: false
            });
        }
        
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { name, email, picture, id } = userRes.data; // Changed google_id to id
        let user = await User.findOne({ email });

        if (user) {
            // User exists, issue JWT
            const token = jwt.sign(
                { _id: user._id, email },
                process.env.SECRET_KEY,
                { expiresIn: process.env.JWT_TIMEOUT }
            );

            return res.status(200).json({
                message: 'Login successful',
                success: true,
                token,
                user,
                redirectUrl: '/',
                newUser: false,
            });
        }

        // If user doesn't exist, generate a temporary token for password setup
        const tempToken = jwt.sign(
            { name, email, picture, google_id: id },
            process.env.SECRET_KEY,
            { expiresIn: '15m' } // Short expiry for security
        );

        return res.status(200).json({
            message: 'Redirect to set password',
            success: true,
            token: tempToken,
            redirectUrl: '/set-password',
            newUser: true,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const setPassword = async (req, res, next) => {
    const { tempToken, password } = req.body;
    if (!tempToken) {
        return res.status(400).json({
            message: "Temporary token is required",
            success: false,
        });
    }
    if (!password) {
        return res.status(400).json({
            message: "Password is required",
            success: false,
        });
    }

    try {
        // Verify the temporary token
        const decoded = jwt.verify(tempToken, process.env.SECRET_KEY);
        const { name, email, picture, google_id } = decoded;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname: name,
            email,
            password: hashedPassword,
            profilePhoto: picture,
            google_id: google_id,
            auth_provider: 'google',
            isVerified: true,
        });

        // Issue a permanent token
        const token = jwt.sign(
            { _id: user._id, email },
            process.env.SECRET_KEY,
            { expiresIn: process.env.JWT_TIMEOUT }
        );

        // Set the token as a cookie
        res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' });

        res.status(200).json({
            message: 'Account created successfully and logged in',
            success: true,
            token,
            user,
            redirectUrl: '/',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
}