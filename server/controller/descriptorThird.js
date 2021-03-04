const descriptorThirdModel = require('../models/descriptorThird')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types.ObjectId

class descriptorThird {
  async getAll(req, res) {
    try {
      let Descriptors = await descriptorThirdModel.find({})
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
      let Descriptors = await descriptorThirdModel.find({
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

const descriptorThirdController = new descriptorThird()
module.exports = descriptorThirdController
