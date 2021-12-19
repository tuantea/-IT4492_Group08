const CUSTOM=require('./../models/custom')
const {md5}=require('./../utils/config')

const addCustom=(req,res)=>{
    let {name,phone,location,bankaccount,typebank} = req.body
  CUSTOM.find({
    phone: phone,
  }).then(doc => {
    if (doc.length) {
      return res.json({
        status: 1003,
        data: '',
        msg: 'nguoi dung da duoc dang ki vui long thu lai'
      })
    } 
    else {
            CUSTOM.create({
            name: name,
            phone:phone,
            location:location,
            bankaccount:bankaccount,
            typebank:typebank
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
const getCustomInfo = (req, res) => {
  const { phone } = req.query
  CUSTOM.find({
    phone:phone
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
const getAllCustom = (req, res) => {
    CUSTOM.find().then(doc => {
      return res.json({
        status: 2000,
        data: doc,
        msg: 'thanhcong'
      })
    }).catch(err => {
      return res.json({
        status: 2003,
        data: err,
        msg: 'that bai'
      })
    })
  }
module.exports={addCustom,getCustomInfo,getAllCustom}