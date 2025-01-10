import mongoose from "mongoose";

const userSchema = new mongoose.SchemaTypes({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    profilePhoto:{
        type: String,
        require: true,
    }

},{timestamps});

export const User = mongoose.model("User" , userSchema);