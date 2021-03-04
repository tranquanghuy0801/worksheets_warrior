const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const descriptorSecondSchema = new mongoose.Schema(
  {
    dContentRef: {
      type: ObjectId,
      ref: 'descriptor1',
    },
    dContent: {
      type: String,
      required: true,
    },
    dCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const descriptorSecondModel = mongoose.model(
  'descriptor2',
  descriptorSecondSchema
)
module.exports = descriptorSecondModel
