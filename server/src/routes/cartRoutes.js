const router = require("express").Router()
const cartController = require("../controllers/cartController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.put("/add_to_cart", [verifyAccessToken], cartController.addToCart)
router.delete("/:pid/delete", cartController.removeProductInCart)
router.get("/products", [verifyAccessToken], cartController.getProductCart)

module.exports = router