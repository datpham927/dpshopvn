const router = require("express").Router()
const authController = require("../controllers/authController")


router.put("/verify/token", authController.sendVerificationEmail)
router.put("/confirm", authController.confirmVerificationEmail)
router.delete("/delete/account", authController.deleteUnconfirmedUser)
router.put("/register", authController.register)
router.post("/login", authController.login)
router.get("/refresh_token", authController.refreshToken)
//----- Forgot password
router.put("/send_email", authController.sendGmailForgetPassword)
router.put("/:token/reset_password", authController.resetPassword)

module.exports = router