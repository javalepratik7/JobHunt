const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const path=require("path")
const cookieParser=require("cookie-parser")

const {connectToMongoose}=require("./connection")

const homeRouter=require("./Routers/HomeRouter")
const userRouter=require("./Routers/UserRouter")
const adminRouter=require("./Routers/AdmineRouter")
const applied=require("./Routers/AppliedJobRouter")
const {onlyLogin}=require("./Middelware/middleware")

// const Book=require("./models/book")

const cors=require("cors")
dotenv.config();

const app=express()

const PORT=process.env.PORT||8001
const url=process.env.MONGODBURL

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

app.use(cookieParser())
app.use(cors());

app.use("/",homeRouter)
app.use("/user",userRouter)
app.use("/admin",onlyLogin,adminRouter)
app.use("/appliedjob",onlyLogin,applied)

connectToMongoose(url)
.then(() => console.log("connection successfully"))
.catch(err => console.log("error", err))

app.listen(PORT,()=>{
    console.log("Server is started successfully",PORT);
})