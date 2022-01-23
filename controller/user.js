const USER=require('./../models/user')
const { createToken, parseToken } = require('./../utils/auth')
const {md5}=require('./../utils/config')
const login=(req,res)=>{
    let{username,password}=req.body
    USER.findOne({
         name : username 
    }).then(doc=>{
        if(doc===null){
            return res.json({
                status:401,
                data:'',
                msg:'ten dang nhap hoac mat khau khong chinh xac'
            })
        }
        if(doc.status==="inactive"){
            return res.json({
              status:401,
              data:'',
              msg:'tai khoan inactive'
            })
        }
         if (doc.status==="blocked"){
          return res.json({
            status:401,
            data:'',
            msg:'tai khoan blocked'
          })
      }
        else{
            let pass=md5(password)
            if(doc.password===pass){  
              const userId = doc._id
              const token = createToken(userId)    
                return res.json({
                    status: 200,
                    data: doc,
                    token:token,
                    msg: 'dang nhap thanh cong'
                  })
            }
            else{
                return res.json({
                    status: 401,
                    data: '',
                    msg: 'ten dang nhap hoac mat khau khong chinh xac'
                  })
            }
        }
        }).catch(err=>{
            return res.json({
                status:401,
                data:err,
                msg:'loi may chu'
            })
        })
}
const register=(req,res)=>{
    let {username, password, rePassword,email,phone} = req.body
  if (password !== rePassword) {
    return res.json({
      status: 401,
      data: '',
      msg: 'hai mat khau khong nhat quan'
    })
  }
  USER.find({
    $or: [
      { username : username },
      { email: email }
    ]
  }).then(doc => {
    if (doc.length) {
      return res.json({
        status: 401,
        data: '',
        msg: 'email da duoc dang ki vui long thu lai'
      })
    } 
    else { 
      USER.find({
      telephone: phone,
    }).then(doc => {
      if (doc.length) {
        return res.json({
          status: 401,
          data: '',
          msg: 'so dien thoai da duoc dang ki vui long thu lai'
        })
      }
      else{ 
           const pass = md5(password)
            USER.create({
            username: username,
            email:email,
            password: pass,
            telephone:phone,
            status:"active",
            role:"user",
            create_at:Date.now(),
            update_at:Date.now()
          }).then(doc2 => {
            if (doc2) {
              return res.json({
                status: 201,
                data: doc2,
                msg: 'dang ki thanh cong'
              })
            } else {
              return res.json({
                status: 401,
                data: '',
                msg: 'dang ki khong thanh cong,vui long thu lai'
              })
            }
          })
        }
      })
    }
      }).catch(err => {
        res.json({
          status: 401,
          data: err,
          msg: 'lỗi máy chủ'
        })
      })
}
// const active(req,res)=>{

// }
const changepassword = async (req, res) => {
  try {
    const { oldPwd, newPwd, reNewPwd, userId } = req.body
    const {password: userPwd} = await USER.findOne({_id: userId}, {pass: 1})
    const oldPwdMD5 = md5(oldPwd)
    const newPwdMD5 = md5(newPwd)
    console.log(req.headers.authorization)
    console.log(userId)
    console.log(userId===parseToken(req.headers.authorization))
    if (parseToken(req.headers.authorization) !== userId) {
      return res.json({
        status: 2001,
        data: [],
        msg: 'thao tac sai！'
      })
    }
    if (userPwd !== oldPwdMD5) {
      return res.json({
        status: 2001,
        data: [],
        msg: 'mat khau cu khong chinh xac'
      })
    }
    if (newPwd !== reNewPwd) {
      return res.json({
        status: 2001,
        data: [],
        msg: 'hai mat khau khong nhat quan'
      })
    }
    const data = await USER.findByIdAndUpdate({
      _id: userId
    }, {
      pass: newPwdMD5
    })
    return res.json({
      status: 2000,
      data: data,
      msg: 'cap nhat thanh cong'
    })
  } catch (error) {
    return res.json({
      status: 2003,
      data: [],
      msg: 'loi may chu nek'
    })
  }
}
const updateUserInfo = async (req, res) => {
  try {
    const { name,gender,address,birthday,phone,email} = req.body
    USER.findOneAndUpdate({
      _id: parseToken(req.headers.authorization)
    }, {
      name: name,
      gender:gender,
      address:address,
      birthday:birthday,
      telephone:phone,
      email:email,
      update_at:Date.now()
    }).then(data=>{
    return res.json({
      status: 200,
      data: data,
      msg: 'thanh cong'
    })
  })
  } catch (error) {
    return res.json({
      status: 401,
      data: error,
      msg: 'loi may chu'
    })
  }
}
const getUserInfo = (req, res) => {
  const  id  = parseToken(req.headers.authorization)
  USER.findById({
    _id: id
  }).then(doc => {
    if (doc) {
      return res.json({
        status: 200,
        data: doc,
        msg: 'thanhcong'
      })
    } else {
      return res.json({
        status: 401,
        data: '',
        msg: 'khong co du lieu'
      })
    }
  }).catch(err => {
    res.json({
      status: 2003,
      data: '',
      msg: 'loi'
    })
  })
}

const deleteUser=(req,res)=>{
  USER.deleteOne({_id:parseToken(req.headers.authorization)}).
  then(doc=>{
    return res.json({
      status:200,
      msg:"Xoa tai khoan"
    })
  }).catch(err=>{
    return res.json({
      status:401,
     msg:"loi may chu"
    })
  })
}
module.exports={ login,register,changepassword,updateUserInfo,getUserInfo,deleteUser}