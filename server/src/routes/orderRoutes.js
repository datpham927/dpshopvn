const router = require("express").Router()
const orderController = require("../controllers/orderController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add", [verifyAccessToken], orderController.createOrderProduct)
// --------------- user(shop) --------------------
router.delete("/:oid/update", [verifyAccessToken], orderController.updateOrder)
router.put("/:oid/is_confirm",  [verifyAccessToken], orderController.isConfirmOrder)
router.put("/:oid/is_delivering", [verifyAccessToken], orderController.isDeliveredOrder)
router.put("/:oid/confirm_delivery", [verifyAccessToken], orderController.isConfirmDeliveredOrder)
router.put("/:oid/is_confirm", [verifyAccessToken], orderController.isConfirmOrder)
router.put("/:oid/is_abort",  [verifyAccessToken], orderController.isCanceledOrder)
router.get("/all_order_bought",  [verifyAccessToken], orderController.getAllOrdersBought)
//------------ admin ---------
module.exports = router


