const router = require("express").Router()
const userController = require("../controllers/userController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.put("/update", [verifyAccessToken], userController.updateUser)
router.put("/:id/follow", [verifyAccessToken], userController.following)
router.get("/:id/detail", [verifyAccessToken, verifyAdmin], userController.detailUser)
//------------------
// admin
router.get("/all", [verifyAdmin], userController.getAllUsers)
router.put("/admin/update", [verifyAdmin], userController.updateUserByAdmin)
router.delete("/admin/delete", [verifyAdmin], userController.deleteUser)



module.exports = router