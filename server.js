import app from './src/app.js';
import dotenv from "dotenv"
dotenv.config()
app.listen(process.env.PORT,()=>{
    console.log(`servers has started on the port ${process.env.PORT}` )
})