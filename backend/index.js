import express  from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from "./routes/user.route.js"

dotenv.config({});
connectDB();

const app = express() ;
const PORT = 8000;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());



const corsOptions = {
    origin :'http://localhost:5173',
    credentials : true
}
    
app.use(cors(corsOptions));

//routes
app.use('/api/v1/user', userRoutes)


app.listen(PORT , ()=> {
    console.log(`Server Running on port ${PORT}`)
})