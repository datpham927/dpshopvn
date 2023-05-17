const router = require("express").Router()
const searchHistoryController = require("../controllers/searchHistoryController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add", [verifyAccessToken], searchHistoryController.addHistory)
router.get("/all_histories", [verifyAccessToken], searchHistoryController.searchHistory)

module.exports = router