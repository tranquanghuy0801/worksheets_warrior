const descriptorFirstModel = require("../models/descriptorFirst");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types.ObjectId;

class descriptorFirst {
	async getAll(req, res) {
		try {
			let Descriptors = await descriptorFirstModel.find({}).populate("dCategory", "_id cName");
			if (Descriptors) {
				return res.json({ Descriptors})
			}
		} catch (err) {
			console.log(err)
		}
	}

	async getByCategoryAndGrade(req, res) {
		try {
			let { cId, grade } = req.body;
			let Descriptors = await descriptorFirstModel.find({ dCategory: ObjectId(cId), grade: grade });
			if (Descriptors) {
				return res.json({ Descriptors})
			}
		} catch (err) {
			console.log(err)
		}
	}
}

const descriptorFirstController = new descriptorFirst
module.exports = descriptorFirstController