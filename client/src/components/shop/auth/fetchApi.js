import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL

export const isAuthenticate = () => localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false

export const isAdmin = () => localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")).user.role === 1 : false

export const isPaid = () => {
    if (localStorage.getItem("jwt")) {
        if (JSON.parse(localStorage.getItem("jwt")).user.role === 1) {
            return true;
        } else {
            return JSON.parse(localStorage.getItem("jwt")).user.paid === "true" ? true : false;
        }
    } else {
        return false
    }
}

export const loginReq = async ({ email, password }) => {
    const data = { email, password }
    try {
        let res = await axios.post(`${apiURL}/api/signin`, data)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const signupReq = async (data, paymentID) => {
    console.log(data)
    try {
        let res = await axios.post(`${apiURL}/api/signup`, { data, paymentID})
        return res.data
    } catch (error) {
        console.log(error);
    }
}