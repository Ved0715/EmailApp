import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  secure: true, // true for port 465, false for port 587
  tls: {
    rejectUnauthorized: true
  }
});
