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
    google_id:{
        type: String,
    },
    auth_provider:{
        type: String,
        required: true,
        default: "local",
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    // verificationCode: {
    //     type: String,
    // },
    // verificationCodeExpires: {
    //     type: Date,
    // },
 

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;