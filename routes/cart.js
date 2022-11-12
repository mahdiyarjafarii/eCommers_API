const Router=require("express").Router();
const {verifyandauthorizen,verifyandadmin}=require("../routes/verrify");
const Cart=require("../models/Cart");


//create
Router.post("/",verifyandauthorizen,async(req,res)=>{
    const newCart=new Cart(req.body);
    try{
        const savedCart=newCart.save();
        res.status(201).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }

})


//updatedcart//
Router.put("/:id",verifyandauthorizen,async (req,res)=>{
try{
const updatedCart=await Cart.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true});
res.status(200).json(updatedCart)
}catch(err){
res.status(400).json(err)
}
});
// //delete//
Router.delete("/:id",verifyandauthorizen,async (req,res)=>{

    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart is deleted...")
    }catch(err){
        res.status(500).json(err)
    }

});
// //get Cart//
Router.get("/:userid",verifyandauthorizen,async (req,res)=>{

    try{
      const Cart=await Cart.findOne({userId:req.params.userid})
        res.status(200).json(Cart)
    }catch(err){
        res.status(500).json(err)
    }

});



//get all Cart//
Router.get("/",verifyandadmin,async (req,res)=>{
   
    try{
        const Carts=await Cart.find();
        res.status(200).json(Carts)
    }catch(err){
        res.status(500).json(err)
    }

});





module.exports=Router