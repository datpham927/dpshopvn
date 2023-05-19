const router = require("express").Router()
const searchController = require("../controllers/searchController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add", [verifyAccessToken], searchController.addHistory)
router.get("/all_histories", [verifyAccessToken], searchController.searchHistory)
router.delete("/:tid/update", [verifyAccessToken], searchController.deleteHistory)
router.get("/suggest", searchController.suggestResult)

module.exports = router