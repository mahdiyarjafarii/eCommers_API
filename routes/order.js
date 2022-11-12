const Router=require("express").Router();
const {verifyandauthorizen,verifyandadmin}=require("../routes/verrify");
const Order=require("../models/Order");


//create Order//
Router.post("/",verifyandauthorizen,async(req,res)=>{
    const newOrder=new Order(req.body);
    try{
        const savedOrder=newOrder.save();
        res.status(201).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }

})


//updatedOrder//
Router.put("/:id",verifyandadmin,async (req,res)=>{
try{
const updatedOrder=await Order.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true});
res.status(200).json(updatedOrder)
}catch(err){
res.status(400).json(err)
}
});
////delete Order//
Router.delete("/:id",verifyandadmin,async (req,res)=>{

    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order  is deleted...")
    }catch(err){
        res.status(500).json(err)
    }

});
////get Order//
Router.get("/:userid",verifyandauthorizen,async (req,res)=>{

    try{
      const Order=await Order.find({userId:req.params.userid})
        res.status(200).json(Order)
    }catch(err){
        res.status(500).json(err)
    }

});



//get all Order//
Router.get("/",verifyandadmin,async (req,res)=>{
   
    try{
        const Orders=await Order.find();
        res.status(200).json(Orders)
    }catch(err){
        res.status(500).json(err)
    }

});





module.exports=Router