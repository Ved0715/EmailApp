import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePhoto:{
        type: String,
    },
    // verificationCode: {
    //     type: String,
    // },
    // verificationCodeExpires: {
    //     type: Date,
    // },
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;