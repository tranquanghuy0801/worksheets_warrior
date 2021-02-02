const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    pName: {
        type: String,
        required: true
    },
    pDescription: {
        type: String,
        required: true
    },
    pCategory: {
        type: ObjectId,
        ref: "categories"
    },
    pImages: {
        type: Array,
        required: true
    },
    pFile: {
        type: String,
        required: true
    },
    pStatus: {
        type: String,
        required: true
    }

}, { timestamps: true })

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;