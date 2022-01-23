const DB=require('./../utils/connectDB').mongoose
const Schema=DB.Schema
const autoIncrement= require('mongoose-auto-increment')
const userSchema=new Schema({
    name:String,
    gender:{type:String,default:''},
    address:{String,default:''},
    birthday:{Date,default:''},
    telephone:{type:String,unique:true},
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    status:String,
    password:String,
    role:String,
    remember_token:String,
    create_at:Date,
    updated_at:Date
})
autoIncrement.initialize(DB.connection); 
userSchema.plugin(autoIncrement.plugin, 'user');
const user=DB.model('user',userSchema)
module.exports=user