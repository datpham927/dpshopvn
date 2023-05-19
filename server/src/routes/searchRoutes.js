const router = require("express").Router()
const searchController = require("../controllers/searchController")
const { verifyAccessToken } = require("../middlewares/verifyToken")


router.post("/add", [verifyAccessToken], searchController.addHistory)
router.get("/all_histories", [verifyAccessToken], searchController.searchHistory)
router.get("/suggest", searchController.suggestResult)
router.delete("/:tid/update", searchController.deleteHistory)

module.exports = router