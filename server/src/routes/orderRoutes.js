const router = require("express").Router()
const orderController = require("../controllers/orderController")
const { verifyAdmin, verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add", [verifyAccessToken], orderController.createOrderProduct)
// --------------- user(shop) --------------------
router.delete("/:oid/update", [verifyAccessToken], orderController.updateOrder)
router.put("/:oid/confirm_delivery", [verifyAccessToken], orderController.isConfirmDeliveredOrder)
router.put("/:oid/is_confirm", [verifyAccessToken], orderController.isConfirmOrder)
router.put("/:oid/is_abort",  [verifyAccessToken], orderController.isCanceledOrder)
router.put("/:oid/is_buy",  [verifyAccessToken], orderController.isBuyOrder)
router.put("/:oid/is_success",  [verifyAccessToken], orderController.isSuccessOrder)
router.get("/all_order_bought",  [verifyAccessToken], orderController.getAllOrdersBought)
router.get("/all_order_sold",  [verifyAccessToken], orderController.getAllOrdersBeenBought)
router.get("/view/:oid",  [verifyAccessToken], orderController.getDetailOrder)
//------------ admin ---------
module.exports = router


