import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req , res , next) => {
    try {
        const {fullname , email , password} = req.body;
        if (!fullname || !email || !password) return res.status(400).json({
            message:"all fields are required" , 
            success: false,
        });

        const user = await User.findOne({email});
        if (user) return res.status(400).json({
            message:"User already exists" ,
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
            success:true,
        });
    } catch (error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });

    }
}

export const login  = async(req , res , next) => {
    try {
        const {email , password} = req.body;
        if (!email || !password) return res.status(400).json({
            message:"all fields are required" , 
            success: false
        });

        const user  = await User.findOne({email});
        if(!user) return res.status(401).json({
            message: "Invalid email or password" , 
            success: false,
        })

        const isPasswordMatch = await bcrypt.compare(password , user.password);
        if(!isPasswordMatch) return res.status(401).json({
            message: "Invalid email or password" , 
            success: false,
        })

        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn:'1d'});
        return res.status(200).cookie("token" , token , {maxAge:1*24*60*60*1000 , httpOnly:true , sameSite:'strict'}).json({
            message: `${user.fullname}, Logged in successfully.` ,
            user,
            success:true
        })

    } catch (error) { 
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });

    }
}



export const logout = async(req , res ) => {
    try {
        return res.status(200).cookie('tocken' , "", {maxAge:0}).json({
            message:"Logged Out Successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error. Something Went Wrong !!",
            success: false,
        });
    }
}