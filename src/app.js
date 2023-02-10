import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRouter from "./routes/userRoutes.js"
import blogRouter from "./routes/blogsRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser"
import session from "express-session"
const app = express()
dotenv.config()
app.use(cookieParser('SercetStringForCookies'));
app.use(session({
    secret: 'SecretStringForCookies',
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true
}))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
}).then(console.log("database connected successfully"))
.catch((e)=>console.log(e))
app.use(express.json())
app.use("/api/v1",authRouter);
app.use("/api/v1",blogRouter);
app.use("/api/v1",messageRoutes);
export default app
