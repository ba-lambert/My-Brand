import mongoose from "mongoose"
import passportLocalMongoose from 'passport-local-mongoose'
const userSchema = new mongoose.Schema({
    username : {
        type :String,
        required :true,
    },
    email : {
        type : String,
        required :true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    admin : Boolean
},{timestamps : true})
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("Users",userSchema)