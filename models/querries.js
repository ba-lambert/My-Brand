const mongoose = require("mongoose")
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
module.exports = mongoose.model("messages",messagesSchema)