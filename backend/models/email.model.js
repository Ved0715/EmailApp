import mongoose from "mongoose";

const emailSchema = new mongoose.SchemaTypes({
    to:{
        type:String,
        require:true,
    },
    subject:{
        type:String,
        require:true,
    },
    message:{
        type:String,
        require:true,
    },

},{timestamps});

export const Email = mongoose.model("Email" , emailSchema);