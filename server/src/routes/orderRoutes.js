const router = require("express").Router()
const orderController = require("../controllers/orderController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add", [verifyAccessToken], orderController.createOrderProduct)
router.delete("/:oId/update", [verifyAdmin, verifyAccessToken], orderController.updateOrder)
router.put("/:oId/is_confirm", [verifyAdmin], orderController.isConfirmOrder)
router.put("/:oId/is_deliver", [verifyAdmin], orderController.isDeliveredOrder)
router.put("/:oId/is_handle", [verifyAdmin], orderController.isHandleOrder)
router.put("/:oId/is_abort", [verifyAdmin], orderController.isCanceledOrder)

module.exports = router


