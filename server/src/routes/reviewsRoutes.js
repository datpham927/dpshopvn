const router = require("express").Router()
const reviewsController = require("../controllers/reviewsController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.post("/:pid", [verifyAccessToken], reviewsController.createReview)
router.delete("/:cid/delete_comment",[verifyAccessToken], reviewsController.deleteReview)
router.get("/get/:pid", reviewsController.getAllReviews)
router.put("/:cid/edit_comment", [verifyAccessToken], reviewsController.editComment)
router.put("/:cid/like_comment", [verifyAccessToken],reviewsController.likeComment)
router.put("/:cid/unlike_comment",[verifyAccessToken], reviewsController.unlikeComment)
router.get("/:pid/ratings_product", reviewsController.getRatingsProduct)
// -------- admin -------
router.delete("/:cid/delete_comment",[verifyAdmin], reviewsController.deleteReview)


module.exports = router