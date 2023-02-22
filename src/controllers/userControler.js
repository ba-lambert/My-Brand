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
    res.status(200).json({message:'message has sent successfully',data:squerry})
}
const deleteMessage =async (req,res)=>{
    const {id} = req.params
    const dMessage = await messages.findByIdAndDelete({_id:id})
    res.status(201).json({message:'message has been delete successfully'})
}
export {
    getAllQuerries,
    newMessage,
    deleteMessage
}