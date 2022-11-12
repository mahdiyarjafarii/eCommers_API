const Router=require("express").Router();
const {verifyandauthorizen,verifyandadmin}=require("../routes/verrify");
const User=require("../models/User")
//updateduser//
Router.put("/:id",verifyandauthorizen,async (req,res)=>{
if(req.body.password){
    req.body.password=cryptoJs.AES.encrypt(req.body.password,process.env.ALGO_PASS).toString()
}
try{
const updatedUser=await User.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true});
res.status(200).json(updatedUser)
}catch(err){
res.status(400).json(err)
}
});
//delete//
Router.delete("/:id",verifyandadmin,async (req,res)=>{

    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user is deleted...")
    }catch(err){
        res.status(500).json(err)
    }

});
//get user//
Router.get("/find/:id",verifyandadmin,async (req,res)=>{

    try{
      const user=await User.findById(req.params.id);
      const {password,...others}=user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }

});



//get all user//
Router.get("/find",verifyandadmin,async (req,res)=>{
    const query=req.query.new

    try{
      const users=query?await User.find().sort({_id:-1}).limit(1):User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }

});





module.exports=Router