const DB=require('./../utils/connectDB').mongoose
const Schema=DB.Schema
const customSchema=new Schema({
    name:String,
    phone:String,
    location:String,
    bankaccount:String,
    typebank:String
})
const custom=DB.model('custom',customSchema)
module.exports=custom