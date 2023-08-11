const router = require("express").Router()
const conversationController = require("../controllers/conversationController")
const { verifyAccessToken, verifyAdmin } = require("../middlewares/verifyToken")


router.post("/create_conversation", [verifyAccessToken], conversationController.createConversation)
router.get("/all_conversation", [verifyAccessToken], conversationController.getAllConversations)




module.exports = router