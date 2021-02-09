import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL

export const getAllProduct = async () => {
	try {
		let res = await axios.get(`${apiURL}/api/product/all-product`)
		return res.data;
	} catch (error) {
		console.log(error);
	}

}

export const createProduct = async ({ pName, pStatus, pGrade, pCategory, pLevel, pFile, pDescriptor1, pDescriptor2, pDescriptor3, pCode1, pCode2, pCode3, pKeywords }) => {
	/* Most important part for uploading multiple image  */
	let formData = new FormData();
	/* Most important part for uploading multiple image  */
	formData.append("pName", pName)
	formData.append("pStatus", pStatus)
	formData.append("pGrade", pGrade)
	formData.append("pLevel", pLevel)
	formData.append("pCategory", pCategory)
	formData.append("pDescriptor1", pDescriptor1)
	formData.append("pDescriptor2", pDescriptor2)
	formData.append("pDescriptor3", pDescriptor3)
	formData.append("pFileName", pCode1 + pCode2 + pCode3 +  pLevel + '-1.pdf')
	formData.append("pFile", pFile)
	formData.append("pKeywords", pKeywords)
	try {
		let res = await axios.post(`${apiURL}/api/product/add-product`, formData)
		console.log(res);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const editProduct = async (product) => {
	console.log(product);
	let newFileName = "";
	let editFormData = new FormData();
	editFormData.append("pId", product.pId)
	editFormData.append("pName", product.pName)
	editFormData.append("pStatus", product.pStatus)
	editFormData.append("pGrade", parseInt(product.pGrade))
	editFormData.append("pLevel", product.pLevel)
	editFormData.append("pKeywords", product.pKeywords)
	// if (product.pCategory._id) {
	// 	editFormData.append("pCategory", product.pCategory._id)
	// } else {
	// 	editFormData.append("pCategory", product.pCategory)
	// }
	if (typeof product.pDescriptor1 === 'string'){
		editFormData.append("pDescriptor1", product.pDescriptor1.split('-')[0])
		newFileName += product.pDescriptor1.split('-')[1]
	} else {
		editFormData.append("pDescriptor1", product.pDescriptor1._id)
		newFileName += product.pDescriptor1.dCode
	}
	if (typeof product.pDescriptor2 === 'string'){
		editFormData.append("pDescriptor2", product.pDescriptor2.split('-')[0])
		newFileName += product.pDescriptor2.split('-')[1]
	} else {
		editFormData.append("pDescriptor2", product.pDescriptor2._id)
		newFileName += product.pDescriptor2.dCode
	}
	if (typeof product.pDescriptor3 === 'string'){
		newFileName += product.pDescriptor3.split('-')[1]
		editFormData.append("pDescriptor3", product.pDescriptor3.split('-')[0])
	} else {
		editFormData.append("pDescriptor3", product.pDescriptor3._id)
		newFileName += product.pDescriptor3.dCode
	}
	if (newFileName !== product.pFile.split('-')[0]) {
		let count = product.pFile.split('-')[1];
		count = parseInt(count.split('.')[0])
		editFormData.append("pFileName", newFileName + product.pLevel + '-' + String(count + 1) + '.pdf')
	}
	editFormData.append("pFile", product.pFile);

	if (product.pEditFile) {
		editFormData.append("pEditFile", product.pEditFile)
	}
	try {
		let res = await axios.post(`${apiURL}/api/product/edit-product`, editFormData)
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const deleteProduct = async (pId) => {
	try {
		let res = await axios.post(`${apiURL}/api/product/delete-product`, { pId })
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const productByCategory = async (catId) => {
	try {
		let res = await axios.post(`${apiURL}/api/product/product-by-category`, { catId })
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const getDescriptorFirst = async (cId, grade) => {
	try {
		if (typeof cId !== 'string') {
			cId = cId._id;
		}
		let res = await axios.post(`${apiURL}/api/descriptor-first/by-category-grade`, { cId, grade })
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const getDescriptorSecond = async (firstId) => {
	try {
		if (typeof firstId !== 'string') {
			firstId = firstId._id;
		}
		let res = await axios.post(`${apiURL}/api/descriptor-second/by-first-descriptor`, { firstId })
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const getDescriptorThird = async (firstId) => {
	try {
		if (typeof firstId !== 'string') {
			firstId = firstId._id;
		}
		let res = await axios.post(`${apiURL}/api/descriptor-third/by-first-descriptor`, { firstId })
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const getAllDescriptorThird = async () => {

}