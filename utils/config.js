const crypto=require('crypto')
const API=require('./connectDB')
const TOKEN_SECRET='thayhung'
const WHILE_LIST=[
    `${API}/user/login`,
    `${API}/user/register`,
    `${API}/user/changepassword`,
]
function md5(pass){
    let md5=crypto.createHash('md5')
    return md5.update(pass).digest('hex')
}
module.exports={md5,TOKEN_SECRET,WHILE_LIST}