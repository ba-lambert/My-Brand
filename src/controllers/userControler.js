import messages from "../models/querries.js"
//gel all querries
const getAllQuerries = async (req,res)=>{
    try {
        const message =await messages.find().sort({createdAt :-1})
        res.status(200).json(message)
    } catch (error) {
        res.status(404).json(error)
    }
}
//create comment
const newMessage = async (req,res)=>{
    const newQuerry = new messages({
        userNames : req.body.userNames,
        email : req.body.email,
        message: req.body.message
    })
    const squerry =await newQuerry.save();
    res.status(200).json(squerry)
}
export {
    getAllQuerries,
    newMessage
}