const USER=require('./../models/user')
const {md5}=require('./../utils/config')
const register=(req,res)=>{
  let {username, password, rePassword,email,phone,role} = req.body
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
          role:role,
          address:"",
          birthday:"",
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
const getAllUser = (req, res) => {
    USER.find({role:"user"}).then(doc => {
      return res.json({
        status: 200,
        data: doc,
        msg: 'thanh cong'
      })
    }).catch(err => {
      return res.json({
        status: 401,
        data: err,
        msg: 'that bai'
      })
    })
  }
const getUserByPhone = (req, res) => {
    const { phone } = req.body
    USER.findOne({
      telephone:phone
    }).then(doc => {
      if (doc) {
        return res.json({
          status: 200,
          data: doc,
          msg: 'thanh cong'
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
        status: 401,
        data: '',
        msg: 'loi'
      })
    })
  }
const getUserById = (req, res) => {
    const { id } = req.query
    USER.findById({
      _id:id
    }).then(doc => {
      if (doc) {
        return res.json({
          status: 200,
          data: doc,
          msg: 'thanh cong'
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
        status: 401,
        data: '',
        msg: 'loi'
      })
    })
  }
const active = (req, res) => {
    const { id } = req.query
    USER.updateOne(
      { _id: id },
      { $set: { status: 'active' }}
    ).then(doc => {
      if (doc) {
        return res.json({
          status: 200,
          msg: 'thanh cong'
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
        status: 401,
        data: '',
        msg: 'loi'
      })
    })
  }
  const blocked = (req, res) => {
    const { id } = req.query
    console.log(id)
    USER.findByIdAndUpdate(
      { _id: id },
       { status: 'blocked' }
    ).then(doc => {
      if (doc) {
        return res.json({
          status: 200,
          msg: 'thanh cong'
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
        status: 401,
        data: err,
        msg: 'loi'
      })
    })
  }
  const inactive = (req, res) => {
    const { id } = req.query
    USER.updateOne(
      { _id: id },
      { $set: { status: 'inactive' }}
    ).then(doc => {
      if (doc) {
        return res.json({
          status: 200,
          msg: 'thanh cong'
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
        status: 401,
        data: '',
        msg: 'loi'
      })
    })
  }
module.exports={getAllUser,getUserByPhone,getUserById,active,blocked,inactive,register}