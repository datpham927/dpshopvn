const { randomTokenByCrypto, hashTokenByCrypto } = require("../middlewares/cryptoToken")
const { generateRefreshToken, generateAccessToken, verifyRefreshToken } = require("../middlewares/jwt")
const User = require("../models/User")
const sendMail = require("../ulits/sendMail")
const bcrypt = require("bcrypt") //mã hóa
const crypto = require("crypto") //random
const { OAuth2Client } = require("google-auth-library") //random
require("dotenv").config()

//gửi email xác nhận mật khẩu,và thêm tokenConfirm vào database
const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(403).json({
            success: false,
            message: "Input required!"
        })
        // create a random token string
        const token = randomTokenByCrypto(3)
        const hashToken = hashTokenByCrypto(token)
        //kiểm tra email đăng ký chưa thành công có tồn tại không
        const response = await User.findOne({ email, password: { $exists: false } })
        if (response) {
            // update token xác minh vào database (trường hợp muốn gửi lại token đến email khi token hết hạn)
            await User.findOneAndUpdate({ email, password: { $exists: false } }, {
                verificationEmailToken: hashToken,
                passwordTokenExpires: Date.now() + 5 * 60 * 1000
            })
        } else {
            //kiểm tra account tồn tại chưa, nếu chưa thì create
            const user = await User.findOne({ email })
            if (user) return res.status(200).json({
                success: false,
                message: "Account already exists!"
            })

            await User.create({
                email, verificationEmailToken: hashToken,
                passwordTokenExpires: Date.now() + 5 * 60 * 1000
            }, { new: true })
        }
        sendMail({
            email, html: `<div >
            <p > Mã xác minh đăng ký tài khoản của bạn là
              <span style="color:blue;font-size:20px" >${token}</span> 
              hiệu lực trong vào 5 phút, không chia sẽ mã này với người khác. Xin cảm ơn! </p>
            </div>`, fullName: email?.split("@")[0]
        })
        res.status(200).json({
            success: true,
            message: "Sent successful"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
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
            res.status(403).json({
                success: false,
                message: "Confirm failed!"
            })
        }
        user.passwordTokenExpires = null
        user.verificationEmailToken = null
        user.confirm = true
        user.save()
        res.status(200).json({
            success: true,
            message: "Confirm successful!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
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
                success: true,
                message: "Delete successfully!"
            })
        }
        res.status(400).json({
            success: false,
            message: "Delete failed!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
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
        res.status(200).json({
            success: true,
            message: "Register successfully!",
            access_token: `Bearer ${access_token}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
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
        await res.cookie("refresh_token", `Bearer ${refresh_token}`, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            success: true,
            message: "Login successfully!",
            access_token: `Bearer ${access_token}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const refreshToken = async (req, res) => {
    try {
        const cookie = req.cookies
        if (!cookie?.refresh_token) return res.status(401).json({
            success: false,
            message: "Cookie required!"
        })
        const response = verifyRefreshToken(cookie?.refresh_token)
        if (!response) {
            return res.status(403).json({
                success: false,
                message: "Verification failed"
            })
        }
        const user = await User.findById(response._id)
        const access_token = generateAccessToken({ _id: user.id, admin: user.admin })
        res.status(200).json({
            success: true,
            access_token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//-------------
const sendGmailForgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) throw new Error("Input required!")
        // create a random token string
        const token = randomTokenByCrypto(30)
        const hashToken = hashTokenByCrypto(token)
        const response = await User.findOne({ email })
        if (!response) return res.status(200).json({
            success: false,
            message: "Account not exists!",

        })
        const user = await User.findOne({ email })
        user.passwordResetToken = hashToken;
        user.passwordTokenExpires = Date.now() + 5 * 60 * 1000
        user.save()
        sendMail({
            email, html: `<div >
            <p >Để thay đổi mật khẩu cho tài khoản ${email} của bạn vui lòng bấm vào link bên dưới, đường link có hiệu lực trong vòng 5 phút
             </p>
             <a href='${process.env.URL_CLIENT + "/reset_password/" + token}' >Click vào đây!</a>
            </div>`,
            fullName: user.lastName ? user.lastName + " " + user.firstName : email?.split("@")[0]
        })
        res.status(200).json({
            success: true,
            message: "Sent successful",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ passwordResetToken: hashToken, passwordTokenExpires: { $gt: Date.now() } })
        if (user) {
            user.password = bcrypt.hashSync(req.body.password, 10)
            user.passwordResetToken = null
            user.passwordTokenExpires = null
            user.save()
        }
        res.status(200).json({
            success: user ? true : false,
            message: user ? 'Changer password successfully' : 'Changer password failed',
            user
        })
    } catch (error) {

    }
}
const logOut = (req, res) => {
    try {
        res.clearCookie("refresh_token");
        return res.status(200).json({
            success: true,
            message: "logout successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const verifyGoogleToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return false;
    }
}
const loginWithGoogle = async (req, res) => {
    try {
        if (!req.body.token) {
            return res.status(401).json({
                success: false,
                message: "required token ",
            });
        }
        const response = await verifyGoogleToken(req.body.token)
        if (!response) {
            return res.status(401).json({
                success: false,
                message: "Verify google token failed!",
            });
        }

        const { email, given_name, family_name, picture } = response.payload
        const users = await User.findOne({ email })
        let user = null
        if (!users) {
            user = await User.create({ email, firstName: given_name, lastName: family_name, avatar_url: picture })
        } else {
            user = await User.findOneAndUpdate({ email }, { firstName: given_name, lastName: family_name, avatar_url: picture }, { new: true })
        }
        if (!user) {
            res.status(200).json({
                success: false,
            })
        }
        const access_token = generateAccessToken(user._id, user.isAdmin)
        const refresh_token = generateRefreshToken(user._id)
        res.cookie("refresh_token", `Bearer ${refresh_token}`, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            success: true,
            message: "Login successfully!",
            access_token: `Bearer ${access_token}`
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    sendVerificationEmail, confirmVerificationEmail,
    deleteUnconfirmedUser, register, login, refreshToken,
    sendGmailForgetPassword, resetPassword, logOut, loginWithGoogle
}