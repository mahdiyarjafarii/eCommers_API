const Router=require("express").Router();
const User=require("../models/User");
const cryptoJs=require("crypto-js");
const jwt=require("jsonwebtoken")

//register//
Router.post("/register",async (req,res)=>{
const {username,email,password}=req.body;
const newuser=new User({
    username,
    email,
    password:cryptoJs.AES.encrypt(password,process.env.ALGO_PASS).toString()
})

try{
newuser.save();
res.status(200).json(newuser)
}catch(err){
res.status(500).json(err)
}
});
////

///login
Router.post("/login",async (req,res)=>{
    const {username,password}=req.body
    try{
        const user=await User.findOne({username});
        !user&&res.status(401).json("user in not found..")
        const unhashedpass=cryptoJs.AES.decrypt(user.password,process.env.ALGO_PASS).toString(cryptoJs.enc.Utf8)
        console.log(unhashedpass)
        unhashedpass !==password && res.status(403).json("your password is not correct..")
        const accessToken=jwt.sign({
           id:user._id,
           isAdmin:user.isAdmin 
        },process.env.ALGO_JWT,{expiresIn:"3d"})
        res.status(200).json({user,accessToken})
    }catch(err){
        res.status(500).json(err)
    }






})



module.exports=Router