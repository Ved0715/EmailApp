import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },
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
    last_login_date:{
        type: Date,
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

 

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;