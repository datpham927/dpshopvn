const router = require("express").Router()
const cartController = require("../controllers/cartController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/all_to_cart", [verifyAccessToken], cartController.addToCart)
router.delete("/:pid/update", cartController.updateCart)
// router.put("/register", cartController.register)
// router.post("/login", cartController.login)

module.exports = router