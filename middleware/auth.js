const jwt=require("jsonwebtoken");
// const cookie = require("cookie-parser");
require('dotenv').config();
const SecretKey=process.env.SECRET_KEY;

const auth=(req,res,next)=>{
    
    try {
        let token=req.cookies.token;
        console.log("Token:",token)
        if(token){
            let user=jwt.verify(token,SecretKey);
            console.log("Verified User",user);
            req.userId=user.uid;
            next();
        }else{
     
           res.redirect("/login");
        }
    } catch (error) {
        console.log("Auth Middleware Error:",error.message);
        res.status(401).json({error:"something wrong"})
    }
}
const authPage=(permissions)=>{
   return (req,res,next)=>{
    try{ 
       let token=req.cookies.token;
       let user=jwt.verify(token,SecretKey);

       const userRole=user.userType;
       if(permissions.includes(userRole)){
           next()
       }else{
         res.redirect("/");
       } 
    }catch(error){
        console.log(error);
        res.redirect("/login")
    }
    }
}
module.exports={auth,authPage};