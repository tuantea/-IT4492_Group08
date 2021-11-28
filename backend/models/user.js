const DB=require('./../utils/connectDB').mongoose
const Schema=DB.Schema
const userSchema=new Schema({
    name:String,
    email:String,
    pass:String,
    status:Number,
    location:String,
    bankaccount:String,
    typebank:String
})
const user=DB.model('user',userSchema)
module.exports=user