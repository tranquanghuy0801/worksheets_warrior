import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

export const cartListProduct = async () => {
	let carts = JSON.parse(localStorage.getItem("cart"))
	let productArray = []
	if(carts){
		for (const cart of carts) {
			productArray.push(cart.id)
		}
	}
	try {
		let res = await axios.post(`${apiURL}/api/product/cart-product`, { productArray })
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

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