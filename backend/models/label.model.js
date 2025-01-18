import mongoose from "mongoose";

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

const Label = mongoose.model("Label", labelSchema);
export default Label;