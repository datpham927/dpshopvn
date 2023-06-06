const router = require("express").Router()
const reviewsController = require("../controllers/reviewsController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/:pid", [verifyAccessToken], reviewsController.createComment)
router.get("/get/:pid", reviewsController.getComment)
router.put("/edit/:id", [verifyAccessToken], reviewsController.editComment)
router.put("/:id/like_comment", [verifyAccessToken],reviewsController.likeComment)
router.put("/:id/unlike_comment",[verifyAccessToken], reviewsController.unlikeComment)

module.exports = router