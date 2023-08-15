const router = require("express").Router()
const messageController = require("../controllers/messageController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.post("/:conversationId/add_message", [verifyAccessToken], messageController.addMessage)
router.get("/:conversationId/all_message", [verifyAccessToken], messageController.getAllMessageByConversationId)




module.exports = router