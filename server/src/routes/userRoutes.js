const router = require("express").Router()
const userController = require("../controllers/userController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.put("/update", [verifyAccessToken], userController.updateUser)
router.put("/update/:id", [verifyAdmin], userController.updateUserByAdmin)
// router.get("/confirm/token", userController.confirmVerificationEmail)
// router.delete("/delete/account", userController.deleteUnconfirmedUser)
// router.put("/register", userController.register)
// router.post("/login", userController.login)

module.exports = router