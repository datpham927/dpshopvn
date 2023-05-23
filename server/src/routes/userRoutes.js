const router = require("express").Router()
const userController = require("../controllers/userController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.put("/update", [verifyAccessToken], userController.updateUser)
router.put("/:id/follow", [verifyAccessToken], userController.following)
router.get("/user_detail", [verifyAccessToken], userController.currentUserDetail)

//------------------
// admin
router.get("/all", [verifyAdmin], userController.getAllUsers)
router.put("/admin/update", [verifyAdmin], userController.updateUserByAdmin)
router.delete("/admin/delete", [verifyAdmin], userController.deleteUser)
router.get("/:id/admin_user_detail", [verifyAdmin], userController.adminUserDetail)




module.exports = router