const API='/api/ltct'
const DB_URL=process.env.MONGOLAB_URI||'mongodb://127.0.0.1:27017/ltct'
const mongoose=require('mongoose')
mongoose.set('objectIdGetter',true)
mongoose.connect(DB_URL,{
    useNewUrlParser:true
})
mongoose.Promise=global.Promise
module.exports={API,mongoose}
