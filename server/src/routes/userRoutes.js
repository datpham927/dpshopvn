const router = require("express").Router()
const userController = require("../controllers/userController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.put("/update", [verifyAccessToken], userController.updateUser)
router.put("/update/:id", [verifyAdmin], userController.updateUserByAdmin)
router.get("/detail/:id", [verifyAccessToken, verifyAdmin], userController.detailUser)
router.delete("/delete/:id", [verifyAdmin], userController.deleteUser)
//------------------
router.put("/follow/:id", [verifyAccessToken], userController.following)

module.exports = router