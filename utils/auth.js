const { json } = require('express')
const jwt=require('jsonwebtoken')
const {TOKEN_SECRET,WHILE_LIST} =require('./config')
module.exports={
    createToken(str){
        return jwt.sign({str},TOKEN_SECRET,{expiresIn:'1h'})
    },
     checkToken(req,res,next){
         try{
             const token=req.headers.authorization
             const origin=req.originalUrl
             if(WHILE_LIST.includes(origin)){
                 next()
             }else{
                 if(token){
                     const userId=jwt.verify(token,TOKEN_SECRET).str
                     if(!userId){
                         return res.json({
                             status:1006,
                             data:[],
                             msg:"dang nhap da het han"
                         })
                     }else{
                         next()
                     }
                 }else{
                     return json({
                         status:2002,
                         data:[],
                         msg:"nguoi dung chua dang nhap dau"
                     })
                 }
             }
         }catch(error){
             return res.json({
                 status:1006,
                 data:error,
                 msg:"dang nhap da het han"
             })
         }
     },
     parseToken(token){
         const userId=jwt.verify(token,TOKEN_SECRET).str
         return userId
     }
}