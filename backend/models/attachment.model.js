import mongoose from "mongoose";

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

const Attachment = mongoose.model("Attachment", attachmentSchema);
export default Attachment;