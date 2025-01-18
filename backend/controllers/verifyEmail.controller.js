import jwt from "jsonwebtoken";
import { transporter } from "../config/emailConfig.js";
import dotenv from "dotenv";

dotenv.config();



const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

const NodeMailerMail = (recipientEmail, verificationCode) => {
    return {
        from: process.env.EMAIL_USER, // Sender address
        to: recipientEmail, // Recipient email address
        subject: 'Email Verification Code', // Email subject
        html: `
          <h3>Email Verification</h3>
          <p>Your verification code is:</p>
          <h2>${verificationCode}</h2>
          <p>Please enter this code in the app to verify your email address.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>The code will expire in 5 minutes.</p>
        `, // HTML content with the verification code
    };
}


export const sendVerificationCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }

        const verificationCode = generateVerificationCode();

        const token  = jwt.sign({
            email, verificationCode
        }, process.env.SECRET_KEY, {expiresIn: '5m'});
        


        const mailOptions = NodeMailerMail(email, verificationCode);
        const info = await transporter.sendMail(mailOptions);


        if (info) {
            return res.status(200).json({
                message: "Verification code sent to your email",
                success: true,
                token,
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
}

export const verifyEmail = async (req, res, next) => {
    try {
        const { email, verificationCode , token } = req.body;
        console.log(email, verificationCode, token);
        if (!email){
            return res.status(400).json({
                message: "Email is required",
                success: false,
            });
        }
        if (!verificationCode){
            return res.status(400).json({
                message: "Verification code is required",
                success: false,
            });
        }
        if (!token){
            return res.status(400).json({
                message: "Token is required",
                success: false,
            }); 
        }


        const decode = jwt.verify(token , process.env.SECRET_KEY);
        if(!decode) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
            });
        };
        if ( decode.email !== email || decode.verificationCode !== verificationCode ) {
            return res.status(400).json({
                message: "Invalid verification email or verificationCode",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Email verified successfully",
            success: true,
            redirectUrl: 'somewere',
        })
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}



