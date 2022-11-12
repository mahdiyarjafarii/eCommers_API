const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
   const authHeader= req.headers.token
   if(authHeader){
          const token=authHeader.split(" ")[1];
    jwt.verify(token,process.env.ALGO_JWT,(err,user)=>{
        if(err){
            res.status(403).json("your token is not valid...")
        }else{
            req.user=user
            next();
        }
    })
   }else{
    console.log('SSS')
    res.status(401).json("you dont have token....")
   }
};

const  verifyandauthorizen=(req,res,next)=>{
verifyToken(req,res,()=>{
    if(req.user.id==req.params.id||req.user.iaAsmin){
        next();
    }else{
        res.status(403).json("you are not alowed to do this...")
    }
})
}

const  verifyandadmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("you are not alowed to do this...")
        }
    })
    }
module.exports={verifyandauthorizen,verifyandadmin};