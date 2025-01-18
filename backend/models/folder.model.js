import mongoose from "mongoose";

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
export default Folder;