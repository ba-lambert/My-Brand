import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
        text: {
         type: String,
         trim: true,
         required: true
        },
        date: {
         type: Date,
         default: Date.now
         },
         userId : {
            type:String
         },
         userName : {type:String},
         Blog: {
            type: String
         }
})
export default mongoose.model("comments",commentSchema)