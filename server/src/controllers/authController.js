const { randomTokenByCrypto, hashTokenByCrypto } = require("../middlewares/cryptoToken")
const { generateRefreshToken, generateAccessToken } = require("../middlewares/jwt")
const User = require("../models/User")
const sendMail = require("../ulits/sendMail")
const bcrypt = require("bcrypt")


//gửi email xác nhận mật khẩu,và thêm tokenConfirm vào database
const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) throw new Error("Input required!")
        // create a random token string
        const token = randomTokenByCrypto(3)
        const hashToken = hashTokenByCrypto(token)
        //kiểm tra email đăng ký chưa thành công có tồn tại không
        const response = await User.findOne({ email, password: { $exists: false } })
        if (response) {
            // update token xác minh vào database (trường hợp muốn gửi lại token đến email khi token hết hạn)
            await User.findOneAndUpdate({ email, password: { $exists: false } }, {
                verificationEmailToken: hashToken,
                passwordTokenExpires: Date.now() + 30 * 1000
            }, { new: true })
        } else {
            //kiểm tra account tồn tại chưa, nếu chưa thì create
            const user = await User.findOne({ email })
            if (user) throw new Error("Account already exists!")
            await User.create({
                email, verificationEmailToken: hashToken,
                passwordTokenExpires: Date.now() + 20 * 60 * 1000
            }, { new: true })
        }
        sendMail({
            email, html: `<div >
            <p > Mã xác minh đăng ký tài khoản của bạn là
              <span style="color:blue;font-size:20px" >${token}</span> 
              hiệu lực trong vào 5 phút, không chia sẽ mã này với người khác. </p>
            </div>`, fullName: "yeeu em "
        })
        res.status(200).json({
            err: true,
            message: "Sent successful"
        })
    } catch (error) {
        res.status(500).json({
            err: false,
            message: error.message
        })
    }
}
// xác nhận mã có đúng không
const confirmVerificationEmail = async (req, res) => {
    try {
        const { token, email } = req.body
        if (!token) throw new Error("Token required!")
        //tìm email đang đăng ký, nếu có thì đem ra so sánh 
        const user = await User.findOne({ email, passwordTokenExpires: { $gt: Date.now() } })
        const hashToken = hashTokenByCrypto(token)
        if (hashToken !== user?.verificationEmailToken) {
            throw new Error("Confirm failed!")
        }
        user.passwordTokenExpires = null
        user.verificationEmailToken = null
        user.confirm = true
        user.save()
        res.status(200).json({
            err: true,
            message: "Confirm successful!"
        })
    } catch (error) {
        res.status(500).json({
            err: false,
            message: error.message
        })
    }
}
//remove unconfirmed users
const deleteUnconfirmedUser = async (req, res) => {
    try {
        // xóa account đăng ký chưa thành công
        const { email } = req.body
        const response = await User.findOneAndDelete({ email })
        if (response) {
            res.status(204).json({
                err: true,
                message: "Delete successfully!"
            })
        }
        res.status(400).json({
            err: false,
            message: "Delete failed!"
        })
    } catch (error) {
        res.status(500).json({
            err: false,
            message: error.message
        })
    }
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw new Error("Input required!")
        const hashPassword = bcrypt.hashSync(password, 10)
        //tìm user đăng register và thêm mật khẩu khi đã confirm thành công 
        const response = await User.findOne({ email, password: { $exists: false } })
        if (!response?.confirm) throw new Error("Account already exists or unconfirmed!")
        const user = await User.updateOne({ email }, { password: hashPassword }, { new: true })
        const access_token = generateAccessToken(user._id, user.isAdmin)
        const refresh_token = generateRefreshToken(user._id)
        res.cookie("refresh_token", `Bearer ${refresh_token}`, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(500).json({
            err: true,
            message: "Register successfully!",
            access_token: `Bearer ${access_token}`
        })
    } catch (error) {
        res.status(500).json({
            err: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw new Error("Input required!")
        const user = await User.findOne({ email })
        if (!user) throw new Error("Incorrect account or password!")
        const confirmPassword = bcrypt.compareSync(password, user.password)
        if (!confirmPassword) throw new Error("Incorrect account or password!")
        const access_token = generateAccessToken(user._id, user.isAdmin)
        const refresh_token = generateRefreshToken(user._id)
        res.cookie("refresh_token", `Bearer ${refresh_token}`, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(500).json({
            err: true,
            message: "Register successfully!",
            access_token: `Bearer ${access_token}`
        })
    } catch (error) {
        res.status(500).json({
            err: false,
            message: error.message
        })
    }
}

module.exports = { sendVerificationEmail, confirmVerificationEmail, deleteUnconfirmedUser, register, login }