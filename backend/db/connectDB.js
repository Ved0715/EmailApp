import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongoose connection successful')
    } catch (error){
        console.error(error);
    }
}
export default connectDB;