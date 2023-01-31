const users = require("../models/usersModel")
const bcrypt = require("bcrypt")
const registerUser = async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new users({
            username:req.body.username,
            email:req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save()
        res.status(200).json(user)
    }catch(e){
        res.status(500).json(e)
    }
}

const signIn =  (req,res)=>{
    try {
         users.findOne({email:req.body.email}, async (error,user)=>{
            if(user){
                const validated = await bcrypt.compare(req.body.password ,user.password);
                if (validated) {
                    res.status(200).json(user)
                }else{
                    res.status(404).json("wrong credentials");
                }
            }
            else{
                res.status(404).json("wrong credentials")
            }    
        });
        
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports = {
    registerUser,
    signIn
}