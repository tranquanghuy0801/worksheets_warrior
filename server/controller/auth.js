const {
    toTitleCase,
    validateEmail,
    validatePassword
} = require('../config/function');
const bcrypt = require('bcryptjs');
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

class Auth {

    async isAdmin(req, res) {
        let { loggedInUserId } = req.body
        try {
            let loggedInUserRole = await userModel.findById(loggedInUserId)
            res.json({ role: loggedInUserRole.userRole })
        } catch {
            res.status(404)
        }
    }

    async allUser(req, res) {
        try {
            let allUser = await userModel.find({})
            res.json({ users: allUser })
        } catch {
            res.status(404)
        }
    }

    async postSignup(req, res) {
        let { firstName, lastName, email, cEmail, password, cPassword, city, state, postCode } = req.body
        let error = {}
        if (!firstName || !lastName || !cEmail || !email || !password || !cPassword ||  !city || !state || !postCode) {
            error = {...error, text: "All fields must not be empty"}
            return res.json({ error })
        }
        if (firstName.length < 3 || lastName.length < 3) {
            error = { ...error, firstName: "First Name must be 3 characters minimum", lastName: "Last Name must be 3 characters minimum" }
            return res.json({ error })
        } else {
            if (validateEmail(email)) {
                firstName = toTitleCase(firstName)
                lastName = toTitleCase(lastName)
                if (!validatePassword(password)) {
                    error = { ...error, password: "Password must be at least 8 characters (includes at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character)" }
                    return res.json({ error })
                } else if (postCode.length !== 4) {
                    error = { ...error, postCode: "Invalid Postcode"}
                    return res.json({ error })
                } else {
                    // Email & Number exists Logic
                    try {
                        password = bcrypt.hashSync(password, 10)
                        const data = await userModel.findOne({ email: email })
                        if (data) {
                            error = { ...error, password: "", name: "", email: "Email already exists" }
                            return res.json({ error })
                        } else {
                            let newUser = new userModel({
                                firstName,
                                lastName,
                                email,
                                password,
                                city,
                                state,
                                postCode
                            })
                            newUser.save()
                                .then(data => {
                                    return res.json({ success: "Account create successfully. Please login" })
                                })
                                .catch(err => { console.log(err) })
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            } else {
                error = { ...error, email: "Email is not valid" }
                return res.json({ error })
            }
        }
    }

    async postSignin(req, res) {
        let { email, password } = req.body
        if (!email || !password) {
            return res.json({
                error: "Fields must not be empty"
            })
        }
        try {
            const data = await userModel.findOne({ email: email })
            if (!data) {
                return res.json({
                    error: "Invalid email or password"
                })
            } else {
                const login = await bcrypt.compare(password, data.password)
                if (login) {
                    const token = jwt.sign({ _id: data._id, role: data.userRole }, JWT_SECRET);
                    const encode = jwt.verify(token, JWT_SECRET)
                    return res.json({
                        token: token,
                        user: encode
                    })
                } else {
                    return res.json({
                        error: "Invalid email or password"
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const authController = new Auth
module.exports = authController