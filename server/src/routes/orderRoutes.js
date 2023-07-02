const router = require("express").Router()
const orderController = require("../controllers/orderController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add", [verifyAccessToken], orderController.createOrderProduct)
router.delete("/:oid/update", [verifyAccessToken], orderController.updateOrder)
router.put("/:oid/is_confirm", [verifyAdmin], orderController.isConfirmOrder)
router.put("/:oid/is_deliver", [verifyAdmin], orderController.isDeliveredOrder)
router.put("/:oid/is_handle", [verifyAdmin], orderController.isHandleOrder)
router.put("/:oid/is_abort", [verifyAdmin], orderController.isCanceledOrder)
//------------ admin ---------
router.delete("/:oid/update", [verifyAdmin], orderController.updateOrder)
module.exports = router


