const router = require("express").Router()
const userController = require("../controllers/userController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.put("/update", [verifyAccessToken], userController.updateUser)
router.post("/:id/follow", [verifyAccessToken], userController.following)
router.put("/:id/unfollow", [verifyAccessToken], userController.unFollowing)
router.get("/user_detail", [verifyAccessToken], userController.currentUserDetail)
router.get("/:sid/shop_detail", userController.detailShop)

//------------------
// admin
router.get("/all", [verifyAdmin], userController.getAllUsers)
router.put("/admin/update", [verifyAdmin], userController.updateUserByAdmin)
router.delete("/admin/delete", [verifyAdmin], userController.deleteUser)
router.get("/:id/admin_user_detail", [verifyAdmin], userController.adminUserDetail)




module.exports = router