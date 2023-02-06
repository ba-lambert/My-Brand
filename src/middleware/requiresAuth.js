import User from "../models/usersModel"
const requiredAuth = async(req,res,next)=>{
    const { authorization } = req.headers
    if (!authorization){
        return res.status(401).json({error:'Authorisation required'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id}=authorization.verify(token ,'secret')
        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error:'Request is not authorised'})
    }
}
export default requiredAuth