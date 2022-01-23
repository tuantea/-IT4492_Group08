const USER=require('./../models/user')
const getAllUser = (req, res) => {
    USER.find().then(doc => {
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
    const { id } = req.body
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
    const { id } = req.body
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
    const { id } = req.body
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
module.exports={getAllUser,getUserByPhone,getUserById,active,blocked,inactive}