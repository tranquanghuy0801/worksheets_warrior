const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const descriptorFirstSchema = new mongoose.Schema(
  {
    dCategory: {
      type: ObjectId,
      ref: 'categories',
    },
    dContent: {
      type: String,
      required: true,
    },
    dCode: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const descriptorFirstModel = mongoose.model(
  'descriptor1',
  descriptorFirstSchema
)
module.exports = descriptorFirstModel
