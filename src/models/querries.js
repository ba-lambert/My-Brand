import mongoose from "mongoose"
const messagesSchema = new mongoose.Schema ({
    userNames : {
        type: String,
        required :true
    },
    email : {
        type:String,
        required :true
    },
    message : {
        type:String,
        required:true
    }

},{timestamps:true})
export default mongoose.model("messages",messagesSchema)
