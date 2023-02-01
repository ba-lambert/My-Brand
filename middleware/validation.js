function validate(schema){
    return (req,res,next) =>{
        const {error} = schema.validate(req.body)
        if(error){
            res.status(404).send({
                message:error.message
            });
        }else{
            next();
        }
    }
}
module.exports = validate