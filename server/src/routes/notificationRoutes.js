const router = require("express").Router()
const notificationController = require("../controllers/notificationController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/create", [verifyAccessToken], notificationController.createNotification)
router.get("/get_all_notification", [verifyAccessToken], notificationController.getNotifications)
router.put("/is_watched", [verifyAccessToken], notificationController.confirmIsWatched)

module.exports = router