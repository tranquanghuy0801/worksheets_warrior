const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const descriptorThirdSchema = new mongoose.Schema({
    dContentRef: {
        type: ObjectId,
        ref: "descriptor1"
    },
    dContent: {
        type: String,
        required: true
    },
    dCode: {
        type: String,
        required: true
    }

}, { timestamps: true })

const descriptorThirdModel = mongoose.model("descriptor3", descriptorThirdSchema);
module.exports = descriptorThirdModel;