const router = require("express").Router()
const reviewsController = require("../controllers/reviewsController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/:pid", [verifyAccessToken], reviewsController.createComment)
router.get("/get/:pid", reviewsController.getComment)
// router.delete("/delete/account", reviewsController.deleteUnconfirmedUser)
// router.put("/register", reviewsController.register)
// router.post("/login", reviewsController.login)

module.exports = router