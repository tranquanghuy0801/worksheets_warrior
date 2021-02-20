import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL

export const getAllDescriptorFirst = async () => {
	try {
		let res = await axios.get(`${apiURL}/api/descriptor-first`)
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const getProductByCategoryDescriptor = async (catId, dFirstId) => {
	try {
		let res = await axios.post(`${apiURL}/api/product/by-category-descriptor`, {catId, dFirstId})
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