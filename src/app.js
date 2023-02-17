import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRouter from "./routes/userRoutes.js"
import blogRouter from "./routes/blogsRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import cors from "cors"
import options from "./docs/api-docs.js"
import passport from "passport"
import bodyParser from "body-parser"
import userAuth from "./routes/userAuth.js"
import { serve, setup } from "swagger-ui-express";
const app = express()
const swaggerDocument = require("../swagger.json")
// const specs = swaggerJSDoc(options)  

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs,  { explorer: true }))

// app.use(cors())
app.use(cors({origin: '*'}));
dotenv.config()
app.use(cookieParser('SercetStringForCookies'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", serve, setup(swaggerDocument));
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
app.use(express.json())
// app.use("/api/v1",authRouter);
app.use("/api/v1",userAuth);
app.use("/api/v1",messageRoutes);
app.use("/api/v1",blogRouter);
export default app
