const router = require("express").Router()
const productController = require("../controllers/productController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add_to_product", [verifyAccessToken], productController.createProduct)
router.put("/:id/update", [verifyAdmin, verifyAccessToken], productController.updateProduct)
router.delete("/:id/delete", [verifyAdmin, verifyAccessToken], productController.deleteProduct)
router.get("/:id/detail", [verifyAdmin, verifyAccessToken], productController.detailProduct)
router.get("/all", productController.getAllProducts)

module.exports = router