const router = require("express").Router()
const productController = require("../controllers/productController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add_to_product", [verifyAccessToken], productController.createProduct)
router.put("/:pid/update", [verifyAdmin, verifyAccessToken], productController.updateProduct)
router.delete("/:pid/delete", [verifyAdmin, verifyAccessToken], productController.deleteProduct)
router.get("/:pid/detail", [verifyAdmin, verifyAccessToken], productController.detailProduct)
router.get("/all", productController.getAllProducts)
router.get("/following", [verifyAccessToken], productController.getAllProductFollowing)
//---------------
// router.post("/insert", productController.insertProductsData)

module.exports = router