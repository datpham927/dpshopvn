const router = require("express").Router()
const reviewsController = require("../controllers/reviewsController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.post("/:pid", [verifyAccessToken], reviewsController.createComment)
router.delete("/:cid/delete_comment", [verifyAdmin,verifyAccessToken], reviewsController.deleteComment)
router.get("/get/:pid", reviewsController.getComment)
router.put("/:cid/edit_comment", [verifyAccessToken], reviewsController.editComment)
router.put("/:cid/like_comment", [verifyAccessToken],reviewsController.likeComment)
router.put("/:cid/unlike_comment",[verifyAccessToken], reviewsController.unlikeComment)

module.exports = router