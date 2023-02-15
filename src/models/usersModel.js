import mongoose from "mongoose"
import passportLocalMongoose from 'passport-local-mongoose'
const userSchema = new mongoose.Schema({
    email : {
        type :String,
        required :true,
    },
    password : {
        type : String,
        required : true
    },
},{timestamps : true})
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("Users",userSchema)