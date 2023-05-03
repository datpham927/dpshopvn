const router = require("express").Router()
const productController = require("../controllers/productController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/create", [verifyAccessToken], productController.createProduct)
router.put("/update/:id", [verifyAdmin, verifyAccessToken], productController.updateProduct)
router.delete("/delete/:id", [verifyAdmin, verifyAccessToken], productController.deleteProduct)
router.get("/detail/:id", [verifyAdmin, verifyAccessToken], productController.detailProduct)
router.get("/all", productController.getAllProduct)

module.exports = router