const userModel = require('../models/users')

exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

exports.validateEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  } else {
    return false
  }
}

exports.validatePassword = function (password) {
  if (
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
      password
    )
  ) {
    return true
  } else {
    return false
  }
}

exports.validatePostcode = function (postCode) {
  if (/^[0-9]{4}$/.test(postCode)) {
    return true
  } else {
    return false
  }
}

exports.emailCheckInDatabase = async function (email) {
  let user = await userModel.findOne({ email: email })
  user.exec((err, data) => {
    if (!data) {
      return false
    } else {
      return true
    }
  })
}

exports.phoneNumberCheckInDatabase = async function (phoneNumber) {
  let user = await userModel.findOne({ phoneNumber: phoneNumber })
  user.exec((err, data) => {
    if (data) {
      return true
    } else {
      return false
    }
  })
}
