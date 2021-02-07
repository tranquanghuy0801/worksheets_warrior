const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
	pName: {
		type: String,
		required: true
	},
	pGrade: {
		type: Number,
		required: true
	},
	pCategory: {
		type: ObjectId,
		ref: "categories"
	},
	pDescriptor1: {
		type: ObjectId,
		ref: "descriptor1"
	},
	pDescriptor2: {
		type: ObjectId,
		ref: "descriptor2"
	},
	pDescriptor3: {
		type: ObjectId,
		ref: "descriptor3"
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
	},
	pLevel: {
		type: String,
		required: true
	},
	pKeywords: {
		type: Array
	}

}, { timestamps: true })

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;