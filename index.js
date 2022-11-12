const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRouter=require("./routes/user");
const authRouer=require("./routes/auth");
const productRouter=require("./routes/product");
const orderRouter=require("./routes/order");
const cartRouter=require("./routes/cart");
const stripeRouter=require("./routes/stripe")
const cors=require("cors")
dotenv.config()


///DB conection///
mongoose.connect(process.env.MONGOO_URL)
.then(()=>console.log("DB conected..."))
.catch((err)=>console.log(err))
/////

///route///
app.use(express.json());
app.use(cors());
app.use("/api/user",userRouter);
app.use("/api/auth",authRouer);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);
app.use("/api/cart",cartRouter);
app.use("/api",stripeRouter);;



app.listen(5000,()=>{
    console.log("backend is run ....")
});