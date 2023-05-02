const jwt = require('jsonwebtoken')
require("dotenv").config()

const generateAccessToken = (_id, isAdmin) => jwt.sign({ _id, isAdmin }, process.env.ACCESS_TOKEN, { expiresIn: "24h" })
const generateRefreshToken = (_id) => jwt.sign({ _id }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })


module.exports = {
    generateAccessToken,
    generateRefreshToken
}