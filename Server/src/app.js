import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config({
    path:'./.env'
});
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.ORIGIN,
    metheds:["POST","GET","PUT","PATCH","DELETE"],
    credentials:true
}))
import userRouter from './Routers/User.router.js';
app.use("/api/v1/user",userRouter)
export default app;