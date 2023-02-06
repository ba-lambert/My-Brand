import users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
const createToken = (_id)=>{
    return jwt.sign({_id},'secret',{expiresIn:'3d'})
}
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
        res.status(201).json(user)
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
                    const token = createToken(user._id)
                    res.status(201).json(token)
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
export {
    registerUser,
    signIn
}