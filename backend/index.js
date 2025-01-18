import express  from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path' ;
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import userRoutes from "./routes/user.routes.js";
import emailRoutes from "./routes/email.routes.js";
import verifyRouter from "./routes/verifyEmail.routes.js";

// Load environment variables
dotenv.config({});

const app = express() ;
const PORT = process.env.PORT || 8080;

app.use(helmet());

connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Data sanitization against NoSQL injection
app.use(mongoSanitize());


//middleware
app.get('/', (req, res, next) => {
    res.send("This is my backend");
});

app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());



const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };
    
app.use(cors(corsOptions));

//routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/email", emailRoutes)
app.use("/api/v1/verify-email", verifyRouter)




// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        success: false,
    });
});

app.listen(PORT , ()=> {
    console.log(`Server Running on port ${PORT}`)
})