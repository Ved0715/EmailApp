import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req , res) => {
    try {
        const {fullname , email , password} = req.body;
        if (!fullname || !email || !password) return res.status(400).json({
            message:"all fields are required" , 
            sucess: false,
        });

        const user = await User.findOne({email});
        if (user) return res.status(400).json({
            message:"User already exist with this email" ,
            success: false,
        });

        const hashedPassword = await bcrypt.hash(password , 10);
        const profilePhoto = `https://avatar.iran.liara.run/public/boy`;
        await User.create({
            fullname,
            email,
            password:hashedPassword,
            profilePhoto: profilePhoto
        })
        return res.status(200).json({
            message : "Account Created Successfully",
            sucess:true,
        });
    } catch (error){
        console.error(error)
    }
}

export const login  = async(req , res) => {
    try {
        const {email , password} = req.body;
        if (!fullname || !email || !password) return res.status(400).json({
            message:"all fields are required" , 
            sucess: false
        });

        const user  = await User.findOne({email});
        if(!user) return res.status(401).json({
            message: "Incorrect emial or password" , 
            sucess: false,
        })

        const isPasswordMatch = await bcrypt.compare(password , user.password);
        if(!isPasswordMatch) return res.status(401).json({
            message: "Incorrect emial or password" , 
            sucess: false,
        })

        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn:'1d'});
        return res.status(200).cookie("token" , token , {maxAge:1*24*60*60*1000 , httpOnly:true , sameSite:'strict'}).json({
            message: `${user.fullname} logfed in successfully.` ,
            user
        })

    } catch (error) { 
        console.error(error)
    }
}