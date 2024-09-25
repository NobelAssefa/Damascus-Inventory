const registerUser = (req,res)=>{
    if(!req.body.email){
        res.status(400);
        throw new Error("please enter your email")
    }
    res.send("User is registered Successfully!!!")

}

module.exports = {registerUser};