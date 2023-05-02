const router = require("express").Router()
const authController = require("../controllers/authController")


router.put("/verify/token", authController.sendVerificationEmail)
router.get("/confirm/token", authController.confirmVerificationEmail)
router.delete("/delete/account", authController.deleteUnconfirmedUser)
router.put("/register", authController.register)
router.post("/login", authController.login)

module.exports = router