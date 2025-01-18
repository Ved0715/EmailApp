import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    to:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{ timestamps: true });

const attachmentSchema = new mongoose.Schema({
    emailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Email',
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number, // Size in bytes
    },
    fileType: {
        type: String, // Example: 'image/jpeg', 'application/pdf'
    },
});

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    emails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Email',
    }],
});

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    emails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Email',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Folder = mongoose.model("Folder", folderSchema);
const Email = mongoose.model("Email" , emailSchema);
const Attachment = mongoose.model("Attachment", attachmentSchema);

const Label = mongoose.model("Label", labelSchema);
export default {Email, Attachment ,Label, Folder} ;
