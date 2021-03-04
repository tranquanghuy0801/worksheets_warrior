const descriptorSecondModel = require('../models/descriptorSecond')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types.ObjectId

class descriptorSecond {
  async getAll(req, res) {
    try {
      let Descriptors = await descriptorSecondModel.find({})
      if (Descriptors) {
        return res.json({ Descriptors })
      }
    } catch (err) {
      console.error(err)
    }
  }

  async getByDescriptorFirst(req, res) {
    try {
      let { firstId } = req.body
      let Descriptors = await descriptorSecondModel.find({
        dContentRef: ObjectId(firstId),
      })
      if (Descriptors) {
        return res.json({ Descriptors })
      }
    } catch (err) {
      console.error(err)
    }
  }
}

const descriptorSecondController = new descriptorSecond()
module.exports = descriptorSecondController
