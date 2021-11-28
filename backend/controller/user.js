const USER=require('./../models/user')
const login=(req,res)=>{
    let{email,password}=req.body
    USER.findOne({
     "email":email
    }).then(doc=>{
        if(doc===null){
            return res.json({
                status:1001,
                data:'',
                msg:'ten dang nhap hoac mat khau khong chinh xac'
            })
        }
        if(doc.status===1){
            return res.json({
              status:1006,
              data:'',
              msg:'tai khoan bi khoa'
            })
        }
        if(doc){
            let pass=md5(password)
            if(doc.password===pass){
                return res.json({
                    status: 1000,
                    data: doc,
                    token: token,
                    msg: 'dang nhap thanh cong'
                  })
            }
            else{
                return res.json({
                    status: 1001,
                    data: doc,
                    token: token,
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
    email: email
  }).then(doc => {
    if (doc.length) {
      return res.json({
        status: 1003,
        data: '',
        msg: 'ten nguoi dung da duoc dang ki vui long thu lai'
      })
    } else {
         const pass = md5(password)
          USER.create({
            name: name,
            email:email,
            pass: pass,
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
module.exports={ login,register}