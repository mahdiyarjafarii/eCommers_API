const Router=require("express").Router();
const {verifyandauthorizen,verifyandadmin}=require("../routes/verrify");
const Product=require("../models/Product");

//create
Router.post("/",verifyandadmin,async(req,res)=>{
    const newProduct=new Product(req.body);
    try{
        const savedProduct=newProduct.save();
        res.status(201).json(savedProduct)
    }catch(err){
        res.status(500).json(err)
    }

})


//updatedproduct//
Router.put("/:id",verifyandauthorizen,async (req,res)=>{
try{
const updatedproduct=await Product.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true});
res.status(200).json(updatedproduct)
}catch(err){
res.status(400).json(err)
}
});
// //delete//
Router.delete("/:id",verifyandadmin,async (req,res)=>{

    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("user is deleted...")
    }catch(err){
        res.status(500).json(err)
    }

});
// //get Product//
Router.get("/:id",async (req,res)=>{

    try{
      const Product=await Product.findById(req.params.id);
        res.status(200).json(Product)
    }catch(err){
        res.status(500).json(err)
    }

});



//get all Product//
Router.get("/",async (req,res)=>{
    const qNew=req.query.new;
    const qcategory=req.query.category;
    try{
    let Products;
      if(qNew){
        Products=await Product.find().sort({createdAt:-1}).limit(1);
      }else if(qcategory){
        Products=await Product.find({
            categories:{
                $in:[qcategory]
            }
        })
      }else{
        Products=await Product.find()
      }
        res.status(200).json(Products)
    }catch(err){
        res.status(500).json(err)
    }

});





module.exports=Router