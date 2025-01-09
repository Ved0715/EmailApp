import express  from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDb.js';

dotenv.config({});
connectDB();

const app = express() ;
const PORT = 8000;

app.get("/home" , (req , res , next ) => {
    return res.status(200).json({message: "I am comming for backend" , success:true})
})


app.listen(PORT , ()=> {
    console.log(`Server Running on port ${PORT}`)
})