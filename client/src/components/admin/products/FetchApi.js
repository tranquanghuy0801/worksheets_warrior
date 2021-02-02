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

export const createPorductImage = async ({ pImage }) => {
    /* Most important part for uploading multiple image  */
    let formData = new FormData();
    for (const file of pImage) {
        formData.append("pImage", file)
    }
    /* Most important part for uploading multiple image  */
}

export const createProduct = async ({ pName, pDescription, pStatus, pCategory, pFile }) => {
    /* Most important part for uploading multiple image  */
    let formData = new FormData();
    /* Most important part for uploading multiple image  */
    formData.append("pName", pName)
    formData.append("pDescription", pDescription)
    formData.append("pStatus", pStatus)
    formData.append("pCategory", pCategory)
    formData.append("pFile", pFile)

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
    let editFormData = new FormData();
    editFormData.append("pId", product.pId)
    editFormData.append("pName", product.pName)
    editFormData.append("pDescription", product.pDescription)
    editFormData.append("pStatus", product.pStatus)
    if (product.pCategory._id) {
        editFormData.append("pCategory", product.pCategory._id)
    } else {
        editFormData.append("pCategory", product.pCategory)
    }
    editFormData.append("pFile", product.pFile);

    if (product.pEditFile) {
        console.log(1);
        editFormData.append("pEditFile", product.pEditFile);
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

export const productByPrice = async (price) => {
    try {
        let res = await axios.post(`${apiURL}/api/product/product-by-price`, { price })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}