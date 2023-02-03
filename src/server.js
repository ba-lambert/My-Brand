import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRouter from "./routes/userRoutes.js"
import blogRouter from "./routes/blogsRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
}).then(console.log("database connected successfully"))
.catch((e)=>console.log(e))
app.use(express.json())
app.use("/api/v1",authRouter);
app.use("/api/v1",blogRouter);
app.use("/api/v1messages",messageRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`servers has started on the port ${process.env.PORT}` )
})










// const dotenv = require("dotenv")
// const express = require("express")
// const mongoose = require("mongoose")
// const authRouter = require("./routes/userRoutes")
// const blogRouter = require("./routes/blogsRoutes")
// const messageRoutes = require("./routes/messageRoutes")
// const app1 = express()
// dotenv.config()
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser : true,
// }).then(console.log("database connected successfully"))
// .catch((e)=>console.log(e))
// app.use(express.json())
// app.use("/api/v1",authRouter);
// app.use("/api/v1",blogRouter);
// app.use("/api/v1messages",messageRoutes);

// app.listen(process.env.PORT,()=>{
//     console.log(`servers has started on the port ${process.env.PORT}` )
// })