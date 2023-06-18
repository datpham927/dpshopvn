const router = require("express").Router()
const productController = require("../controllers/productController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add_to_product", [verifyAccessToken], productController.createProduct)
router.put("/:pid/update", [verifyAccessToken], productController.updateProduct)
router.delete("/:pid/delete", [verifyAccessToken], productController.deleteProduct)
router.get("/:pid/detail", productController.detailProduct)
router.get("/all", productController.getAllProducts)
router.get("/:cid/brand", productController.getAllBrand)
router.get("/following", [verifyAccessToken], productController.getAllProductFollowing)
//------ admin ---------
router.put("/:pid/update", [verifyAdmin], productController.updateProduct)
router.delete("/:pid/delete", [verifyAdmin], productController.deleteProduct)
// -----------
router.put("/:pid/update_rating", productController.updateRatingsProduct)


// router.post("/insert", productController.insertProductsData)

module.exports = router