const USER=require('./../models/user')
const { createToken, parseToken } = require('./../utils/auth')
const {md5}=require('./../utils/config')
const login=(req,res)=>{
    let{email,password}=req.body
    USER.findOne({
     email:email
    }).then(doc=>{
        if(doc===null){
            return res.json({
                status:1001,
                data:'',
                msg:'ten dang nhap hoac mat khau khong chinh xac'
            })
        }
        // if(doc.status===1){
        //     return res.json({
        //       status:1006,
        //       data:'',
        //       msg:'tai khoan bi khoa'
        //     })
        // }
        else{
            let pass=md5(password)
            if(doc.pass===pass){  
              const userId = doc._id
              const token = createToken(userId)    
                return res.json({
                    status: 1000,
                    data: doc,
                    token:token,
                    msg: 'dang nhap thanh cong'
                  })
            }
            else{
                return res.json({
                    status: 1001,
                    data: '',
                    msg: 'ten dang nhap hoac mat khau khong chinh xac'
                  })
            }
        }
        }).catch(err=>{
            return res.json({
                status:2003,
                data:err,
                msg:'loi may chu'
            })
        })
}
const register=(req,res)=>{
    let {name,email, password, rePassword} = req.body
  if (password !== rePassword) {
    return res.json({
      status: 1004,
      data: '',
      msg: 'hai mat khau khong nhat quan'
    })
  }
  USER.find({
    email: email,
  }).then(doc => {
    if (doc.length) {
      return res.json({
        status: 1003,
        data: '',
        msg: 'ten nguoi dung da duoc dang ki vui long thu lai'
      })
    } 
    else {
           const pass = md5(password)
            USER.create({
            name: name,
            email:email,
            pass: pass,
            status:0,
            location:"",
            bankaccount:"",
            typebank:""
          }).then(doc2 => {
            console.log(doc2)
            if (doc2['_id']) {
              return res.json({
                status: 1005,
                data: doc2,
                msg: 'dang ki thanh cong'
              })
            } else {
              return res.json({
                status: 1004,
                data: '',
                msg: 'dang ki khong thanh cong,vui long thu lai'
              })
            }
          })
        }
      }).catch(err => {
        res.json({
          status: 2003,
          data: err,
          msg: 'lỗi máy chủ'
        })
      })
}
const changepassword = async (req, res) => {
  try {
    const { oldPwd, newPwd, reNewPwd, userId } = req.body
    const {pass: userPwd} = await USER.findOne({_id: userId}, {pass: 1})
    const oldPwdMD5 = md5(oldPwd)
    const newPwdMD5 = md5(newPwd)
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
    const { location, bank,type, userId } = req.body
    if (parseToken(req.headers.authorization) !== userId) {
      return res.json({
        status: 2001,
        data: [],
        msg: 'thao tac sai'
      })
    }
    const data = await USER.findByIdAndUpdate({
      _id: userId
    }, {
      location: location,
      bankaccount:bank,
      typebank:type
    })
    return res.json({
      status: 2000,
      data: [],
      msg: 'thanh cong'
    })
  } catch (error) {
    return res.json({
      status: 2003,
      data: error,
      msg: 'loi may chu'
    })
  }
}
const getUserInfo = (req, res) => {
  const { id } = req.query
  USER.findById({
    _id: id
  }).then(doc => {
    if (doc) {
      return res.json({
        status: 2000,
        data: doc,
        msg: 'thanhcong'
      })
    } else {
      return res.json({
        status: 2001,
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
module.exports={ login,register,changepassword,updateUserInfo,getUserInfo}